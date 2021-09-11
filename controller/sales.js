const express = require('express');
const salesValidation = require('../middleware/salesMiddleware');
const SalesService = require('../service/SalesService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const salesService = new SalesService();
  const salesRes = await salesService.GetAll();

  res.status(salesRes.status).json(salesRes.message);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const salesService = new SalesService();
  const salesRes = await salesService.FindById(id);

  res.status(salesRes.status).json(salesRes.message);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const salesService = new SalesService();
  const salesRes = await salesService.Delete(id);

  res.status(salesRes.status).json(salesRes.message);
});

router.use(salesValidation);

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newValues = req.body;

  const salesService = new SalesService();
  const salesRes = await salesService.Update({ id, newValues });

  res.status(salesRes.status).json(salesRes.message); 
});

router.post('/', async (req, res) => {
  const sales = req.body;
  const salesService = new SalesService();
  const salesRes = await salesService.InsertOne(sales);
  
  res.status(salesRes.status).json(salesRes.message);
});

module.exports = router;