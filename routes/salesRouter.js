const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);
router.post('/', 
salesController.validQuantity,
salesController.createSale);

router.put('/:id', 
salesController.validQuantity,
salesController.updateSale);

// router.put('/:id', 
// productsController.validName, 
// productsController.validQuantity,
// productsController.validTypeQuantity,
// productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;