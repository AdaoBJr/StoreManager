const { ObjectId } = require('mongodb');

const {
  deleteOne,
  findOne,
} = require('../models/salesModel');

const { error } = require('../middlewares/errorMessage');

const {
  success,
  notFoundCode,
  invalid,
} = error.codeStatus;
const {
  invalidData,
  invalidSaleID,
  notFound,
  saleNotFound,
} = error.errorMessage;

const firstReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: invalidSaleID,
    },
  },
};
const secondReturn = {
  statusCode: notFoundCode,
  infos: {
    err: {
      code: notFound,
      message: saleNotFound,
    },
  },
};

const deleteSale = async (id) => {
  let retorno = {};
  if (!ObjectId.isValid(id)) { retorno = firstReturn; }
  const sale = await findOne(id);
  if (!sale || sale.id === undefined) { retorno = secondReturn; }
  await deleteOne(id);
  retorno = {
    statusCode: success,
    infos: sale,
  };
  return retorno;
};

module.exports = deleteSale;
