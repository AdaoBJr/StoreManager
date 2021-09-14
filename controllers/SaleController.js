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

const getAllSales = async (_req, res) => {
  try {
    const sales = await SaleModel.getAllSales();
    return res.status(StatusCodes.OK).json({ sales });
  } catch (err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(err);
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.getSaleById(id);
  const { message, code } = sale;
  
  if (message) {
    return res.status(StatusCodes.NOT_FOUND).json({ err: { code, message, 
    },
  });
  }
  res.status(StatusCodes.OK).json({ sale });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};