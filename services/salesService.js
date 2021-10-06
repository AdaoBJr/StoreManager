const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const validations = require('../middlewares/validate');

const create = async (saleArray) => {
  const productsId = saleArray.map((sale) => ObjectId(sale.productId));
  await salesModel.productsExist(productsId);

  const isvalid = validations.validateSale(saleArray);

  if (isvalid) return isvalid;

  return salesModel.create(saleArray);
};

module.exports = {
  create,
};
