const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ _id: ObjectId(id) });
  return products;
};

module.exports = {
  getAll,
  getById,
};
