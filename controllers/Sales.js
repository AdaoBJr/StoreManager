const service = require('../services/Sales');

const newSale = async (req, res) => {
  const sale = req.body;
  const result = await service.newSale(sale);
  return res.status(200).json(result);
};

module.exports = {
  newSale,
};
