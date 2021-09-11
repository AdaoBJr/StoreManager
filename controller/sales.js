const express = require('express');
const salesValidation = require('../middleware/salesMiddleware');
const SalesService = require('../service/SalesService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const salesService = new SalesService();
  const salesRes = await salesService.GetAll();

  res.status(salesRes.status).json(salesRes.message);
});

router.use(salesValidation);

router.post('/', async (req, res) => {
  const sales = req.body;
  const salesService = new SalesService();
  const salesRes = await salesService.InsertOne(sales);
  
  res.status(salesRes.status).json(salesRes.message);
});

module.exports = router;