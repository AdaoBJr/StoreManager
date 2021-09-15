const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};

module.exports = {
  getAll,
  getById,
};