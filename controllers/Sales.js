const service = require('../services/Sales');

const getAll = async (req, res) => {
   const result = await service.getAll();
   return res.status(200).json(result);
};

const newSale = async (req, res) => {
  const sale = req.body;
  const result = await service.newSale(sale);
  return res.status(200).json(result);
};

module.exports = {
  newSale,
  getAll,
};
