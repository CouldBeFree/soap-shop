const express = require('express');
const router = express.Router();
const { registerUser, login, getMe, updateDetails, updatePassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);

router.post('/login', login);

router.get('/getme', protect, getMe);

router.put('/updatedetails', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);

module.exports = router;
