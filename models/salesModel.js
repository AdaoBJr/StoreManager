const { ObjectId } = require('mongodb');
const connect = require('./connection');

const add = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });
  return { _id: sales.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const saleExists = async (id) => {
  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale !== null;
};

const getById = async (id) => {
  const exists = await saleExists(id);
  if (!exists) return null;
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const salesId = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return salesId;
};

const update = async (productId, itensSold) => {
  if (!ObjectId.isValid(productId)) return null;
  const db = await connect();
  const { value } = await db.collection('sales')
      .findOneAndUpdate({
        _id: ObjectId(productId) }, { $set: { itensSold } }, { returnDocument: 'after' });
  return value;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = { add, getAll, getById, saleExists, update, remove };
