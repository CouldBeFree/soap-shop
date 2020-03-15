const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { addSelectedProduct, removeSelectedProduct } = require('../controllers/selected');

router.post('/', passportJWT, addSelectedProduct);

router.delete('/', passportJWT, removeSelectedProduct);

module.exports = router;
