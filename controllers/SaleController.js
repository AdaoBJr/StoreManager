const StatusCodes = require('http-status-codes');
const SaleService = require('../services/SaleService');
const SaleModel = require('../models/SaleModel');

const createSale = async (req, res) => {
  const { body } = req;
  const { _id, code, message } = await SaleService.createSale(body);

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  
  res.status(StatusCodes.OK).json({ _id, itensSold: [...req.body] });
};

const getAllSales = async (req, res) => {
  const { id, quantity } = req.body;

  const { code, message, sales } = await SaleModel.getAllSales();

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }

  res.status(200).json({ sales });
};

module.exports = {
  createSale,
  getAllSales,
};