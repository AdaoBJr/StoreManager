const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const item = req.body;
  
  const sale = await salesService.createSale(item);
  if (sale.error) return res.status(422).json(sale.err);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
};