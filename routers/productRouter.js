const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// READ
router.get('/', productController.getAllProducts);

// READ ID
router.get('/:id', productController.getIdProduct);

// ADD
router.post('/', productController.createProduct);

// UPDATE
router.put('/:id', productController.updateProduct);

// DELETE
router.delete('/:id', productController.deleteProduct);

module.exports = router;