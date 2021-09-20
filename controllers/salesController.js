const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res, next) => {
  const createdSales = await salesService.createSales(req.body);
  if (createdSales.error) return next(createdSales.error);
  res.status(200).json({ ...createdSales });
});

module.exports = {
  createSale,
};