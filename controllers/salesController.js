const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = rescue(async (req, res, next) => {
  const productArray = req.body;
  
  const newSale = await salesService.create(productArray);
  if (newSale.error) return next(newSale);

  return res.status(200).json(newSale);
});

module.exports = {
  create,
};