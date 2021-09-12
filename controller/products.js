const express = require('express');
const service = require('../config/depInjection');
const { validateName, validateQuantity } = require('../middleware/productsMiddleware');

const router = express.Router();
 
router.get('/', async (req, res) => {
  const { serviceProduct: productService } = await service;
  const serviceRes = await productService.FindAll();
  res.status(serviceRes.status).json(serviceRes.message);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { serviceProduct: productService } = await service;
  const serviceRes = await productService.FindBy(id, true);

  res.status(serviceRes.status).json(serviceRes.message);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { serviceProduct: productService } = await service;
  const serviceRes = await productService.Delete(id);

  res.status(serviceRes.status).json(serviceRes.message);
});

router.use(validateName, validateQuantity);

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newValues = { id, name, quantity };

  const { serviceProduct: productService } = await service;
  const serviceRes = await productService.Update(newValues);

  res.status(serviceRes.status).json(serviceRes.message);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = { name, quantity };

  const { serviceProduct: productService } = await service;
  const serviceRes = await productService.InsertOne(product);

  res.status(serviceRes.status).json(serviceRes.message);
});

module.exports = router;
