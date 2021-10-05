const express = require('express');
const products = require('./ProductsRouter');
// const sales = require('./SalesRouter');

const router = express.Router();

router.use('/products', products);

module.exports = router;
