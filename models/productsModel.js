const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findName = async (name) => {
  const product = await connection()
  .then((db) => db.collection('products').findOne({ name }));

  return product;
};

const create = async (name, quantity) => {
  const product = await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

  return product.ops[0];
};

const getAll = async () => {
  const getProducts = await connection()
  .then((db) => db.collection('products').find().toArray());

  return getProducts;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productId = await connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

  return productId;
};

const update = async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, quantity } }));
  
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return product && productName;
};

const excluse = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id) }));

  return product;
};

module.exports = {
  findName,
  create,
  getAll,
  getById,
  update,
  excluse,
};