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
    
  if (sale.message) {
    return res.status(StatusCodes.NOT_FOUND).json({ 
      err: { code: sale.code, message: sale.message }, 
    });
  }
  res.status(StatusCodes.OK).json({ sale });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { message, code } = await SaleService.updateSale(id, body);
  
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  res.status(StatusCodes.OK).json({ _id: id, itensSold: body });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};