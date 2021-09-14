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

module.exports = {
  createSale,
};