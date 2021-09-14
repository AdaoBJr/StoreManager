const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const { body } = req;
  const resultService = await salesService.createSale(body);
  if (resultService.err) return res.status(422).json(resultService);
  
  return res.status(200).json(resultService);
};

const getAll = async (_req, res) => {
  const resultService = await salesService.getAll();
  return res.status(200).json(resultService);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const resultService = await salesService.getSalesById(id);
  if (resultService.err) return res.status(404).json(resultService);
  return res.status(200).json(resultService);
};

module.exports = {
  createSale,
  getAll,
  getSalesById,
  // updateProduct,
  // exclude,
};