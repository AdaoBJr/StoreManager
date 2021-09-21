const { ObjectId } = require('mongodb');

const { findOne } = require('../models/salesModel');

const { error } = require('../middlewares/errorMessage');

const {
  success,
  notFoundCode,
} = error.codeStatus;
const {
  saleNotFound,
  notFound,
} = error.errorMessage;

const firstReturn = { 
  statusCode: notFoundCode,
  infos: {
    err: {
      code: notFound,
      message: saleNotFound,
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

const findSale = async (id) => {
  if (!ObjectId.isValid(id)) { return firstReturn; }
  const sale = await findOne(id);
  if (!sale || sale.id === undefined) { return secondReturn; }
  return {
    statusCode: success,
    infos: sale,
  };
};

module.exports = findSale;
