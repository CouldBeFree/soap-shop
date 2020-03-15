const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const { addSelectedProduct } = require('../controllers/selected');

router.post('/', passportJWT, addSelectedProduct);

router.delete('/', passportJWT, () => {

});

module.exports = router;
