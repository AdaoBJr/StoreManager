const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const { body } = req;
  const resultService = await salesService.createSale(body);
  if (resultService.err) return res.status(422).json(resultService);
  
  return res.status(200).json(resultService);
};

module.exports = {
  createSale,
  // getAll,
  // getProductById,
  // updateProduct,
  // exclude,
};