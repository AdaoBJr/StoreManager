const connection = require('../connection');

const getId = async (productId) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('sales')
  .findOne({ productId });
  return result;
};

const createSales = async (sales) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('sales')
  .insertOne({ itensSold: sales });
  return result;
};

module.exports = { getId, createSales };
