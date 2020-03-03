const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  registerUser,
  login,
  getMe,
  updateDetails,
  updatePassword,
  googleOAuthLogin,
  facebookLogin,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');
const passportConf = require('../config/passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogleOAuth = passport.authenticate('googleToken', { session: false });
const passportFacebookOAuth = passport.authenticate('facebookToken', { session: false });

router.post('/register', registerUser);

router.post('/login', passportSignIn, login);

router.get('/getme', passportJWT, getMe);

router.put('/update-details', passportJWT, updateDetails);

router.put('/update-password', passportJWT, updatePassword);

router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:resettoken', resetPassword);

router.post('/google', passportGoogleOAuth, googleOAuthLogin);

router.post('/facebook', passportFacebookOAuth, facebookLogin);

module.exports = router;
