const express = require('express');
const salesController = require('../controller/salesController');
const { checkNewSalesInput } = require('../middlewares');

const router = express.Router();

router.post('/', checkNewSalesInput, salesController.createSales);

module.exports = router;