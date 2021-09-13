const express = require('express');
const ProductsRoutes = require('../controllers/productsControllers');
const SalesRoutes = require('../controllers/salesControllers');

const router = express.Router();

router.use('/products', ProductsRoutes);
router.use('/sales', SalesRoutes);

module.exports = router;