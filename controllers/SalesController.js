const SalesServices = require('../services/SalesServices');

const addSale = async (req, res, next) => {
  const sale = req.body;
  const result = await SalesServices.addSale(sale);
  if (result.status === 422) {
    return next(result);
  }
  return res.status(200).json(result);
};

module.exports = {
  addSale,
};