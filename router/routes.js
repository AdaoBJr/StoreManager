const express = require('express');
const ProductRouters = require('../controller/ProductController');

const router = express.Router();

router.use('/products', ProductRouters);

module.exports = router;
