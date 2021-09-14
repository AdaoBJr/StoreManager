const service = require('../services/products');

async function findById(req, res) {
  const { id } = req.params;
  const result = await service.findById(id);
  return res.status(200).json(result);
}

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  const result = await service.createProduct(name, quantity);
  return res.status(201).json(result);
}

async function fetchProducts(_req, res) {
  const result = await service.fetchProducts();
  return res.status(200).json(result);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await service.updateProduct(id, name, quantity);
  return res.status(200).json(result);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await service.deleteProduct(id);
  return res.status(200).json(result);
}

module.exports = {
  findById,
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
};
