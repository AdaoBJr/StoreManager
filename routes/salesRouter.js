const express = require('express');
const salesController = require('../controller/salesController');
const { checkNewSalesInput, checkifSalesIDExist } = require('../middlewares');

const router = express.Router();

router.post('/', checkNewSalesInput, salesController.createSales);

router.get('/:id', checkifSalesIDExist, salesController.getSalesById);

router.get('/', salesController.getAllSales);

module.exports = router;