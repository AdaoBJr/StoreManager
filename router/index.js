const express = require('express');
const products = require('./ProductsRouter');
const sales = require('./SalesRouter');

const router = express.Router();

router.use('/products', products);
router.use('/sales', sales);

module.exports = router;
