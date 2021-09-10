const productsService = require('../services/productsService');
const { created, ok } = require('../utils/statusCodes');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.createProduct(name, quantity);
  return res.status(created).json(result);
};

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(ok).json({products: result});
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  return res.status(ok).json(result);
};

const updateProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const { id } = req.params;
  const result = await productsService.updateProduct(name, quantity, id);
  return res.status(ok).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedData = await productsService.deleteProduct(id);
  return res.status(ok).json(deletedData);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
