const { StatusCodes } = require('http-status-codes');

const Sales = require('../services/Sales');

const registerNewSales = async (req, res, next) => {
  const arrayNewSales = req.body;

  const addedSales = await Sales.registerNewSales(arrayNewSales);
  if (addedSales.message) {
    return next({
      code: addedSales.code,
      message: addedSales.message,
    });
  }

  res.status(StatusCodes.OK).json(addedSales);
};

const getAllSales = async (req, res, next) => {
  const allSales = await Sales.getAllSales();
  if (allSales.message) {
    return next({ message: allSales.message });
  }

  res.status(StatusCodes.OK).json(allSales);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await Sales.getSaleById(id);
  if (sale.message) {
    return next({
      code: sale.code,
      message: sale.message,
    });
  }
  
  res.status(StatusCodes.OK).json(sale);
};

module.exports = {
  registerNewSales,
  getAllSales,
  getSaleById,
};
