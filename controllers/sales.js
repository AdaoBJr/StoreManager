const salesService = require('../services/sales');

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.createSale(sales);
  if (newSale.wasAnError) return res.status(422).json(newSale);
  return res.status(200).json(newSale);
};

module.exports = {
  createSale,
};
