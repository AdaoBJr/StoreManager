const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findProductByName = async (name) => {
  const product = await connection()
  .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const createProduct = ({ name, quantity }) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

const getAll = () =>
  connection()
  .then((db) => db.collection('products').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = (id, name, quantity) => {
  connection()
  .then((db) => db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: id, name, quantity };
};

const deleteProduct = (id) => {
  connection()
  .then((db) => db.collection('products')
  .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  findProductByName,
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};