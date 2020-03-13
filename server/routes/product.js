const express = require('express');
const router = express.Router();
const { postProduct, removeProduct, updateProduct } = require('../controllers/product');

router.post('/', postProduct);

router.delete('/:id', removeProduct);

router.put('/:id', updateProduct);

module.exports = router;
