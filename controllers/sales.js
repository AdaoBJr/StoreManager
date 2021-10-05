const salesService = require('../services/sales');

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.createSale(sales);
  console.log(newSale);
  if (newSale.wasAnError) return res.status(422).json(newSale);
  return res.status(200).json(newSale.ops[0]);
};

module.exports = {
  createSale,
};
