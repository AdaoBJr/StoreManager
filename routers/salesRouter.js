const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const { checkQuantity } = require('../middlewares/salesMiddleware');

// router.delete('/:id', salesController.deleteProduct);

router.put('/:id', checkQuantity, salesController.updateSale);

router.get('/:id', salesController.getSaleById);

router.get('/', salesController.getSales);

router.post('/', checkQuantity, salesController.registerSale);

module.exports = router;
