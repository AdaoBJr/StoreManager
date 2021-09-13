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

module.exports = {
  registerNewSales,
};
