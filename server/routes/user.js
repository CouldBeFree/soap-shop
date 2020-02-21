const express = require('express');
const router = express.Router();
const { removeUser } = require('../controllers/user');

router.put('/:id');

router.delete('/:id', removeUser);

module.exports = router;
