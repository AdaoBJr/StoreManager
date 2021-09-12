const express = require('express');
const { contCreateProduct } = require('../controllers/productsController');

const router = express.Router();

router.post('/', contCreateProduct);

module.exports = router;