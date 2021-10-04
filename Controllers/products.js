const service = require('../services/Products');

const selectAll = async (req, res) => {
  const result = await service.selectAll();
  return res.status(200).json({ products: result });
};

const selectById = async (req, res) => {
  const { id } = req.params;
  const result = await service.selectById(id);
  return res.status(200).json(result);
};

const createProd = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await service.createProd(name, quantity);
  return res.status(201).json(result);
};

module.exports = {
  createProd,
  selectAll,
  selectById,
};
