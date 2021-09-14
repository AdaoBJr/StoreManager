const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const deleteProduct = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  
  const products = await getConnection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = getConnection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return product;
};

const getAll = async () => getConnection()
    .then((db) => db.collection('products').find().toArray());

const create = async ({ name, quantity }) => {
  const db = await getConnection();

  const product = await db.collection('products').insertOne({ name, quantity });
  return product;
};

module.exports = { create, getAll, findById, deleteProduct };
