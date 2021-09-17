const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const product = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return product !== null;
};

const productIdExists = async (id) => {
  const product = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  
  return product !== null;
};

const createProduct = async ({ name, quantity }) => connection
.getConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => result.ops[0]);

const getAllProducts = async () => connection
.getConnection()
.then((db) =>
  db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const updateProduct = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ))
  .then(() => ({ _id: id, name, quantity }));
};

/*
  Material consultado sobre findOneAndDelete
  https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/#delete-a-document
*/
const removeProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('products')
    .findOneAndDelete({ _id: ObjectId(id) }))
  .then((result) => result.value);
};

module.exports = {
  createProduct,
  productExists,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
  productIdExists,
};