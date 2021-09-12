const express = require('express');
const rescue = require('express-rescue');
const { checkProduct } = require('../middleware/checkProduct');
const { isValidName } = require('../middleware/validName');
const { isValidQuantity } = require('../middleware/validQuantity');
const products = require('../services/products');

const router = express.Router();

router.get(
  '/',
  rescue(async (req, res) => {
    const insertion = await products.getAllProducts();
    res.status(200).json(insertion);
  }),
);

router.post(
  '/',
  isValidName,
  checkProduct,
  isValidQuantity,
  async (req, res) => {
    console.log('controller');
    const { name, quantity } = req.body;
    const insertion = await products.create({ name, quantity });
    console.log(insertion.ops[0]);
    res.status(201).json(insertion.ops[0]);
  },
);

module.exports = router;
