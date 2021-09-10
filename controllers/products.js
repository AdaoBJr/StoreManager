const rescue = require('express-rescue');
const ProductsServices = require('../services/products');

const httpStatus = {
  ok: 200,
};

const getAll = rescue(async (_req, res) => {
  const allProducts = await ProductsServices.getAll();
  res.status(httpStatus.ok).json(allProducts);
});

module.exports = {
  getAll,
};
