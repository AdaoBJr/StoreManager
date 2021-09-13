const express = require('express');
// const rescue = require('express-rescue');
const { checkProduct } = require('../middleware/checkProduct');
const { isValidId } = require('../middleware/validId');
const { isValidName } = require('../middleware/validName');
const { isValidQuantity } = require('../middleware/validQuantity');
const products = require('../services/products');

const router = express.Router();

router.get(
  '/:id',
  isValidId,
  async (req, res) => {
    const { id } = req.params;
    const insertion = await products.getProductById(id);
    res.status(200).json(insertion);
  },
);

router.get(
  '/',
  async (req, res) => {
    const insertion = await products.getProduct();
    res.status(200).json({ products: insertion });
  },
);

router.post(
  '/',
  isValidName,
  checkProduct,
  isValidQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    const insertion = await products.create({ name, quantity });
    res.status(201).json(insertion.ops[0]);
  },
);

module.exports = router;
