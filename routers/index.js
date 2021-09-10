const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/productController');

router.post('/products', ProductController.create);

module.exports = router;