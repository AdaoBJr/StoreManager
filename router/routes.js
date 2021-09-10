const express = require('express');
const ProductRouters = require('../controller/ProductController');
const SalesRouter = require('../controller/SaleController');

const router = express.Router();

router.use('/products', ProductRouters);
router.use('/sales', SalesRouter);

module.exports = router;
