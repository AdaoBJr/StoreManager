const rescue = require('express-rescue');
const Services = require('../services/productService');

const status = {
  OK: 200,
  created: 201,
};

const insertProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const product = await Services.insertProduct(name, quantity);

  return res.status(status.created).json(product);
});

const getAllProducts = rescue(async (_req, res) => {
  const products = await Services.getAllProducts();

  return res.status(status.OK).json({ products });
});

const getProductById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const product = await Services.getProductById(id);

  return res.status(status.OK).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await Services.updateProduct(id, name, quantity);

  return res.status(status.OK).json(product);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Services.deleteProduct(id);

  return res.status(status.OK).json(deletedProduct);
});

module.exports = {
  insertProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
