const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.storeSales);
router.get('/', Controller.sales.getAllSales);
router.get('/:id', Controller.sales.getSalesById);
router.put('/:id', Controller.sales.updateSale);
router.delete('/:id', Controller.sales.deleteSale);

module.exports = router;