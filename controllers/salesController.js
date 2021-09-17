const salesService = require('../services/salesService');
// const salesServiceModel = require('../models/salesModel');

const createSale = async (req, res) => {
  const sales = req.body;
  const postSales = await salesService.createSale(sales);
  if (postSales.err) return res.status(422).json(postSales);
  return res.status(200).json(postSales);
};

module.exports = {
  createSale,
};