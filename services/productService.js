const productModel = require('../models/productModel');

const validQuantityAndName = (quantity, name) => {
  if (typeof (quantity) !== 'number') {
    return { err: { message: '"quantity" must be a number', code: 'invalid_data' } };
  }
  if (quantity < 1) {
    return { err: { 
      message: '"quantity" must be larger than or equal to 1', code: 'invalid_data', 
    } };
  }
  if (name.length < 5) {
    return { err: { 
      message: '"name" length must be at least 5 characters long', code: 'invalid_data', 
    } };
  }
};

const create = async (obj) => {
  const { quantity, name } = obj;
  const valid = validQuantityAndName(quantity, name);
  if (valid) {
    return valid;
  }
  const find = await productModel.findByName(name);
  if (find) {
    return { err: { message: 'Product already exists', code: 'invalid_data' } };
  }
  const { insertedId } = await productModel.create(obj);
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getById = async (id) => {
  const data = await productModel.getById(id);
  if (!data || data.length < 1) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  return data;
};

module.exports = {
  create,
  getById,
};