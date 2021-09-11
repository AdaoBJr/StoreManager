const service = require('../services/saleService');
const model = require('../models/saleModel');

const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const HTTP_OK_STATUS = 200;

const validQuantityOnSale = async (req, res, next) => {
  const sale = req.body;
  const checkQtd = await service.validateQuantity(sale);
  if (!checkQtd) {
    return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        } });
  }
  next();
};

const createSale = async (req, res) => {
  const sale = req.body;
  const sales = await service.create(sale);
  res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await service.getSaleById(id);
  switch (sale) {
    case null: return res.status(NOT_FOUND)
        .json({ err: {
          code: 'not_found',
          message: 'Sale not found',
        } });
        default:
        break;
      }
  res.status(HTTP_OK_STATUS).json(sale);
};

const getAllSales = async (_req, res) => {
  const sales = await model.getAll();

  res.status(HTTP_OK_STATUS).json({ sales });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const updatedSale = await service.updateSale(id, sale);
  res.status(HTTP_OK_STATUS).json(updatedSale);
};

module.exports = { createSale, validQuantityOnSale, getAllSales, getSaleById, updateSale };
