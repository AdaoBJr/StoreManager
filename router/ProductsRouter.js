const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.products.storeProduct);
router.get('/', Controller.products.getAllProducts);
router.get('/:id', Controller.products.getProductsById);
router.put('/:id', Controller.products.updatedProduct);
router.delete('/:id', Controller.products.deleteProduct);

module.exports = router;