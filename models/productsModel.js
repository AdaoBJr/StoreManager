const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: result.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const result = await connection.getConnection().then((db) =>
    db.collection('products').find().toArray());

  return result;
};

const getProductByName = async (name) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('products').find({ name }).toArray());

  return result;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('products').find({ _id: ObjectId(id) }).toArray());

  return result[0];
};

const updateProductById = async ({ id, name, quantity }) => {
  await connection.getConnection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { id, name, quantity };
};

const removeFromStockQuantity = async ({ productId, quantity }, stockQuantity) => {
  await connection.getConnection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $set: { quantity: stockQuantity - quantity } }));

  return null;
};

const addToStockQuantity = async ({ productId, quantity }, stockQuantity) => {
  await connection.getConnection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $set: { quantity: stockQuantity + quantity } }));

  return null;
};

const excludeProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection.getConnection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return result;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  excludeProductById,
  updateProductById,
  removeFromStockQuantity,
  addToStockQuantity,
};
