const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', productsController.getAllProducts);

router.post('/', productsController.addProduct);

router.get('/:id', productsController.getProductById);

router.put('/:id', productsController.updateProductById);

router.delete('/:id', productsController.getProductById, productsController.deleteProductById);

module.exports = router;
