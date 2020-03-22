const express = require('express');
const router = express.Router();
const { postProduct, removeProduct, updateProduct, getProducts, getProduct } = require('../controllers/product');

router.post('/', postProduct);

router.delete('/:id', removeProduct);

router.put('/:id', updateProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);

module.exports = router;
