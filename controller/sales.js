const express = require('express');
const salesValidation = require('../middleware/salesMiddleware');
const SalesService = require('../service/SalesService');

const router = express.Router();

router.post('/', salesValidation, async (req, res) => {
  const sales = req.body;
  const salesService = new SalesService();
  const salesRes = await salesService.InsertOne(sales);
  
  res.status(salesRes.status).json(salesRes.message);
});

module.exports = router;