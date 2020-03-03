const express = require('express');
const router = express.Router();
const { postProduct, removeProduct, updateProduct, addProductBasket, removeProductBasket } = require('../controllers/product');

router.post('/', postProduct);

router.delete('/:id', removeProduct);

router.put('/:id', updateProduct);

router.post('/basket', addProductBasket);

router.put('/basket', removeProductBasket);

module.exports = router;
