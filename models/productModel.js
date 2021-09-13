const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());

  return products;
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return product;
};

const insertProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    ))
    .then(() => ({ _id: id, name, quantity }));

  return product;
};

const deleteProduct = async (id) => {
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

const sumProductQuantity = async (id, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $inc: { quantity: +quantity } },
    ));

  return null;
};

const subProductQuantity = async (id, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $inc: { quantity: -quantity } },
    ));

  return null;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  sumProductQuantity,
  subProductQuantity,
};
