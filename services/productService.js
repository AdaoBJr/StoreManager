const { ObjectId } = require('mongodb');
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

const createProduct = async (obj) => {
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
  if (id.length !== 24) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  const data = await productModel.getById(id);
  return data;
};

const updateById = async (id, body) => {
  const { quantity, name } = body;
  const valid = validQuantityAndName(quantity, name);
  if (valid) {
    return valid;
  }
  await productModel.updateId(id, body);
  return { _id: id, ...body };
};

const deleteId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { message: 'Wrong id format', code: 'invalid_data' } };
  }
  const people = await productModel.getById(id);
  await productModel.deleteId(id);
  return people;
};

module.exports = {
  createProduct,
  updateById,
  deleteId,
  getById,
};