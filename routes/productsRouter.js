const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getAProductById);
router.post('/', 
productsController.validName, 
productsController.validQuantity,
productsController.validTypeQuantity,
productsController.createProducts);

module.exports = router;