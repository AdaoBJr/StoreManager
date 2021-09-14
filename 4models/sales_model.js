const connection = require('./connection');

const createSalesModel = async (sale) => {
  const DB = await connection();
  const a = { itensSold: sale };
  const products = await DB.collection('sales').insertOne(a);
  return products.ops[0];
};

module.exports = {
  createSalesModel,
};