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

const atualizarVenda = async (id, sales) => {
  console.log(sales);
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  await auxConnection.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } });
  return getId(id);
};

module.exports = { getId, getAll, createSales, deleteVenda, atualizarVenda };
