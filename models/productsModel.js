const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerProducts = async (name, quantity) => {
  const insertingProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => result.ops[0]);

  return insertingProduct;
};

const getAllProducts = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());

    return allProducts;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

    return product;
};
const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

    return product;
};

module.exports = {
  registerProducts,
  getAllProducts,
  getProductById,
  findByName,
};
