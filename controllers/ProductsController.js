const express = require('express');
const ProductsModel = require('../models/ProductsModel');

const router = express.Router();

router.get('/', async (_request, response, next) => {
  const { products, error } = await ProductsModel.getAll();

  if (error) {
    return next(error);
  }

  return response.status(200).json(products);
});

module.exports = router;
