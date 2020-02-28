const express = require('express');
const router = express.Router();
const { registerUser, login, getMe, updateDetails, updatePassword, googleOAuthLogin, facebookLogin } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', login);

router.get('/getme', protect, getMe);

router.put('/updatedetails', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

router.post('/signin-google', googleOAuthLogin);

router.post('/signin-facebook', facebookLogin);

module.exports = router;
