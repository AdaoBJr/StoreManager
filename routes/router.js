const express = require('express');
const ProductsRoutes = require('../controllers/productsControllers');

const router = express.Router();

router.use('/products', ProductsRoutes);

module.exports = router;