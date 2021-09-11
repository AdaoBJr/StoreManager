const { Router } = require('express');

const productsController = require('../controllers/productsContoller');

const router = Router();

router.post('/products',
productsController.validName,
productsController.validQuantity,
productsController.createProducts);

module.exports = router;
