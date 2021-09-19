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

const deleteVenda = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  const auxGetId = await getId(id);
  await auxConnection.collection('sales')
  .deleteOne({ _id: ObjectId(id) });
  if (auxGetId) {
    return auxGetId;
  }
  return null;
};

module.exports = { getId, getAll, createSales, deleteVenda };
