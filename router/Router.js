const express = require('express');
const routerProducts = require('../controllers/productControler');
const routerSales = require('../controllers/salesController');

const router = express.Router();

router.use('/products', routerProducts);
router.use('/sales', routerSales);

module.exports = router;
