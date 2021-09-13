const salesService = require('../services/salesService');

const registerNewSale = async (req, res) => {
  const sales = req.body;
  const insertSales = await salesService.registerNewSale(sales);
  if (insertSales.err) return res.status(422).json(insertSales);
  res.status(200).json(insertSales);
};

module.exports = {
  registerNewSale,
};