const express = require('express');
const { validateName, validateQuantity } = require('../middleware/productsMiddleware');

const router = express.Router();
const ProductService = require('../service/ProductService');

router.get('/', async (req, res) => {
  const productService = new ProductService();
  await productService.FindAll();
});
router.use(validateName, validateQuantity);
router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = { name, quantity };
  const productService = new ProductService();
  const ServiceRes = await productService.InsertOne(product);
  res.status(ServiceRes.status).json(ServiceRes.message);
});

module.exports = router;
