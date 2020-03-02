const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, login, getMe, updateDetails, updatePassword, googleOAuthLogin, facebookLogin } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const passportConf = require('../config/passport');

router.post('/register', registerUser);

router.post('/login', passport.authenticate('local', { session: false }), login);

router.get('/getme', passport.authenticate('jwt', { session: false }), getMe);

router.put('/updatedetails', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

router.post('/signin-google', googleOAuthLogin);

router.post('/signin-facebook', facebookLogin);

module.exports = router;
