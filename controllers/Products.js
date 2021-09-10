const service = require('../services/Products');

const getAll = async (req, res) => {
  const result = await service.getAll();
  return res.status(200).json({ products: result });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id);
  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await service.createProduct(name, quantity);
  return res.status(201).json(result);
};

module.exports = {
  createProduct,
  getAll,
  getById,
};
