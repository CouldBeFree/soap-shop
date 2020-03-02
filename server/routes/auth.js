const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, login, getMe, updateDetails, updatePassword, googleOAuthLogin, facebookLogin } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const passportConf = require('../config/passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleOAuth = passport.authenticate('googleToken', { session: false });

router.post('/register', registerUser);

router.post('/login', passportSignIn, login);

router.get('/getme', passportJWT, getMe);

router.put('/updatedetails', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

router.post('/signin-google', passportGoogleOAuth, googleOAuthLogin);

router.post('/signin-facebook', facebookLogin);

module.exports = router;
