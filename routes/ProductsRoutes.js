const { Router } = require('express');

const productsController = require('../controllers/productsContoller');

const router = Router();

router.put('/products/:id',
productsController.validName,
productsController.validQuantity,
productsController.validTypeQuantity,
productsController.editProduct);

router.delete('/products/:id', productsController.deleteProduct);

router.get('/products/:id', productsController.validId);

router.get('/products', productsController.AllProducts);

router.post('/products',
productsController.validName,
productsController.velidExistenceProduct,
productsController.validQuantity,
productsController.validTypeQuantity,
productsController.createProduct);

module.exports = router;
