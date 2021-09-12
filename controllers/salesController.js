const { StatusCodes } = require('http-status-codes');

const model = require('../models/salesModel');

const registerSale = async (req, res) => {
  const itemsSold = req.body;
  const result = await model.registerSale(itemsSold);
  return res.status(StatusCodes.OK).json(result);
};

module.exports = {
  registerSale,
};
