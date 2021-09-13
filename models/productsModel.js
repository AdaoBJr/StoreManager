const { ObjectId } = require('mongodb');
const mongodb = require('./connection');

const getProductByName = async (newProduct) => {
  const { name } = newProduct;
  const dataCheck = await mongodb.getConnection()
  .then((db) => db.collection('products').find({ name }).toArray());
  return dataCheck;
};

const registerNewProduct = async (newProduct) => {
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  const { insertedId } = connectedDB.insertOne(newProduct);
  return { insertedId, ...newProduct };
};

const getProducts = async () => {
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  const products = await connectedDB.find().toArray();
  return { products };
};

const getProductById = async (id) => {
  const product = await mongodb.getConnection()
  .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray())
  .catch(() => false);
  return product[0];
};

const updateProduct = async ({ id, name, quantity }) => {
  await mongodb.getConnection()
  .then((db) => db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  await mongodb.getConnection()
  .then((db) => db.collection('products')
  .deleteOne({ _id: ObjectId(id) }));
};

const subtractProducts = (products) => (
  products.map(({ productId, quantity }) => mongodb.getConnection()
    .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quantity * -1 } }))));

const addProducts = (products) => (
products.map(({ productId, quantity }) => mongodb.getConnection()
  .then((db) => db.collection('products')
  .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity } }))));

module.exports = {
  getProductByName,
  registerNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  subtractProducts,
  addProducts,
};
