const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const arr = req.body;
  const newSale = await salesService.createSale(arr);
  return res.status(200).json(newSale);
};

module.exports = {
  createSale,
};