const saleModel = require('../models/salesModel');

const STATUS_ERROR_CLIENT = 422;

const checkIfQuantityIsValid = async (salesArray) => {
  const minQtd = 1;
  const checkQtd = await salesArray
    .find((element) => typeof element.quantity !== 'number' || element.quantity < minQtd);
  return checkQtd;
};

const saleQuatityCheck = async (req, res, next) => {
  const salesArr = req.body;
  const qtdCheck = await checkIfQuantityIsValid(salesArr);
  if (qtdCheck) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

const idRemoveCheck = async (req, res, next) => {
  const { id } = req.params;
  const sale = await saleModel.getByIdSale(id);
  if (!sale) {
    res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  return next();
};

module.exports = { saleQuatityCheck, idRemoveCheck };
