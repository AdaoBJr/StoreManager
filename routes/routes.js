const { Router } = require('express');

const productsController = require('../controllers/productsContoller');

const router = Router();

router.get('/products/:id', productsController.validId);
router.get('/products', productsController.AllProducts);
router.post('/products',
productsController.validName,
productsController.validTypeQuantity,
productsController.validQuantity,
productsController.createProducts);

module.exports = router;
