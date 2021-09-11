const express = require('express');
const salesController = require('../controller/salesController');
const { checkNewSalesInput } = require('../middlewares');
const checkSalesID = require('../middlewares/checkSalesID');

const router = express.Router();

router.post('/', checkNewSalesInput, salesController.createSales);

router.get('/:id', checkSalesID, salesController.getSalesById);

router.get('/', salesController.getAllSales);

router.put('/:id', checkNewSalesInput, salesController.updateSale);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;