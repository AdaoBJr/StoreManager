// const { ObjectId } = require('mongodb');
const Connection = require('./connection');

const createSale = async (sale) => {
  const db = await Connection.getConnection();
  const result = await db.collection('sales').insertOne(sale);
  console.log(result[0]);
  return result[0];
};

module.exports = {
  createSale,
};
