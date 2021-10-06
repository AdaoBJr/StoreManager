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

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales) {
    return {
      number: 404,
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) {
    return {
      number: 404,
      error: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const update = async (id, productArray) => {
  const getSale = await getById(id);

  if (getSale.error) return getSale;

  const isvalid = validations.validateSale(productArray);

  if (isvalid) return isvalid;

  return salesModel.update(id, productArray);
};

const getForDelete = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) {
    return {
      number: 422,
      error: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  return sale;
};

const deleteOne = async (id) => {
  const getSale = await getForDelete(id);

  if (getSale.error) return getSale;

  salesModel.deleteOne(id);

  return getSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
