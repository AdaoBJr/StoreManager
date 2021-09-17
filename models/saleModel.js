const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getOne = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne({ _id: ObjectId(id) });
};

const add = async (productsList) => {
  const db = await connection();
  const sales = await db.collection('sales')
    .insertOne({ itensSold: productsList });
  return { _id: sales.insertedId, itensSold: productsList };
};

const update = async (id, productId, quantity) => {
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } });

  return { _id: id, itensSold: [{ productId, quantity }] };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  return db.collection('sales')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {

  add,
  getAll,
  getOne,
  update,
  exclude,
};