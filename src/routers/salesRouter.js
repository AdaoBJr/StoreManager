const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.put('/:id', salesController.updateSaleById);

router.post('/', salesController.addSale);

module.exports = router;
