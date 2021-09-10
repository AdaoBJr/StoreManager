const express = require('express');

const rescue = require('express-rescue');
const services = require('../services/productService');

const router = express.Router();

const STATUS_FAIL = 422;
const STATUS_OK = 201;

router.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    
    const newProduct = await services.newProducts(name, quantity);

    if (newProduct.err) return res.status(STATUS_FAIL).json(newProduct);

    return res.status(STATUS_OK).json(newProduct);
  }),
);

module.exports = router;