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

const updateSales = async (req, res, next) => {
  const { id } = req.params;
  const arraySales = req.body;

  const updatedSales = await Sales.updateSales(id, arraySales);
  if (updatedSales.message) {
    return next({
      code: updatedSales.code,
      message: updatedSales.message,
    });
  }

  res.status(StatusCodes.OK).json(updatedSales);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const deletedSale = await Sales.deleteSale(id);
  if (deletedSale.message) {
    return next({
      code: deletedSale.code,
      message: deletedSale.message,
    });
  }

  res.status(StatusCodes.OK).json(deletedSale);
};

module.exports = {
  registerNewSales,
  getAllSales,
  getSaleById,
  updateSales,
  deleteSale,
};
