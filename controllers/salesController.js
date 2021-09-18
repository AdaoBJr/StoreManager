const salesService = require('../services/salesService');

const registerSales = async (req, res) => {
  const itemSold = req.body;
  const newSales = await salesService.registerSales(itemSold);

  if (newSales.err) {
    return res.status(422).json(newSales);
  }

  return res.status(200).json(newSales);
};

module.exports = {
  registerSales,
};
