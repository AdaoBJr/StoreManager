const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');

const validQuantity = (quantity) => {
  if (typeof (quantity) !== 'number' || quantity < 1) {
    return { err: { 
      message: 'Wrong product ID or invalid quantity', code: 'invalid_data', 
    } };
  }
  return false;
};

const createSale = async (items) => {
  let condition = '';
  await items.forEach((sale) => {
    condition = validQuantity(sale.quantity);
    return condition;
  });
  if (condition.err) {
    return condition;
  }
  const { insertedId: id } = await saleModel.createSale(items);
  return {
    _id: id,
    itensSold: items,
  };
};

const getAll = async () => {
  const findAll = await saleModel.getAll();
  const obj = { sales: [...findAll] };
  return obj;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { message: 'Sale not found', code: 'not_found' } };
  }
  const findId = await saleModel.getById(id);
  if (!findId) {
    return { err: { message: 'Sale not found', code: 'not_found' } };
  }
  return findId;
};

const updateId = async (id, sale) => {
  if (!ObjectId.isValid(id)) {
    return { err: { message: 'Sale not found', code: 'not_found' } };
  }
  const valid = validQuantity(sale[0].quantity);
  console.log(valid);
  if (valid.err) {
    return valid;
  }
  const update = await saleModel.updateId(id, sale);
  return update;
};

module.exports = {
  createSale,
  getAll,
  updateId,
  getById,
};