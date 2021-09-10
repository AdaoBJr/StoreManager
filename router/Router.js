const express = require('express');
const routerProducts = require('../controllers/productControler');

const router = express.Router();

router.use('/products',routerProducts);
// router.use('/vendas', routerVendas);

module.exports = router;
