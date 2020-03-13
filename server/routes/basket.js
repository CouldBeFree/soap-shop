const express = require('express');
const router = express.Router();
const { addProductBasket, removeProductBasket } = require('../controllers/basket');

router.post('/', addProductBasket);

router.delete('/', removeProductBasket);

module.exports = router;
