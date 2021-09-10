const express = require('express');
const salesController = require('../controller/salesController');

const router = express.Router();

router.post('/', salesController.createSales);

module.exports = router;