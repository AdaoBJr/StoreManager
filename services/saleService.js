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
  await items.map((sale) => {
    condition = validQuantity(sale.quantity);
    return condition;
  });
  if (condition.err) {
    return condition;
  }
  const { insertedIds: id } = await saleModel.createSale(items);
  return {
    _id: id,
    itensSold: items,
  };
};

const getAll = async () => {
  const findAll = await saleModel.getAll();
  let obj = {};
  findAll.forEach(({ _id, productId, quantity }) => {
    obj = { sales: [{ _id, itensSols: [{ productId, quantity }] }] };
  });
  console.log(obj);
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

module.exports = {
  createSale,
  getAll,
  getById,
};