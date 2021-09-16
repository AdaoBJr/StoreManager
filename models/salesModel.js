const { ObjectId } = require('mongodb');
const connection = require('./mongoConnetion');

const COLLECTION = 'sales';

const createSale = async (array) => {
  const db = await connection();
  const create = await db.collection(COLLECTION).insertOne({ itensSold: array });

  return create.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const allSales = await db.collection(COLLECTION).find().toArray();

  return allSales;
};

const getById = async (id) => {
  const db = await connection();
  const get = await db.collection(COLLECTION).findOne(ObjectId(id));

  return get;
};

const updateSale = async (productId, itensSold) => {
  const db = await connection();
  const sale = await db.collection(COLLECTION)
  .updateOne({ _id: ObjectId(productId) }, { $set: { itensSold } });

  return sale;
};

const deleteSale = async (id) => {
  const db = await connection();
  const sale = await db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};