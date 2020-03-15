const express = require('express');
const router = express.Router();
const { addProductBasket, removeProductBasket } = require('../controllers/basket');
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/', passportJWT, addProductBasket);

router.delete('/', passportJWT, removeProductBasket);

module.exports = router;
