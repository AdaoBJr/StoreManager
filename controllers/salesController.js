const { StatusCodes } = require('http-status-codes');

const model = require('../models/salesModel');

const registerSale = async (req, res) => {
  try {
    const itemsSold = req.body;
    const result = await model.registerSale(itemsSold);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};

const getSales = async (_req, res) => {
  try {
    const sales = await model.getSales();
    return res.status(StatusCodes.OK).json({ sales });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await model.getSaleById(id);
    return res.status(StatusCodes.OK).json({ sale });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    const updatedSale = await model.updateSale(id, item);
    return res.status(StatusCodes.OK).json(updatedSale);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSale,
};
