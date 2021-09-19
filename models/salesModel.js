const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  const result = await auxConnection.collection('sales')
  .findOne(ObjectId(id));
  return result;
};

const getAll = async () => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('sales')
  .find().toArray();
  return { sales: result };
};

const createSales = async (sales) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('sales')
  .insertOne({ itensSold: sales });
  return result;
};

module.exports = { getId, getAll, createSales };
