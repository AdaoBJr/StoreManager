const connection = require('./connection');

const findName = async (name) => {
  const db = await connection();
  const nameProduct = await db.collection('products').findOne({ name });
  return nameProduct;
};

const createProducts = async (name, quantity) => {
  const db = await connection();
  const addProduct = await db.collection('products').insertOne({ name, quantity });
  return { _id: addProduct.insertedId, name, quantity };
};

module.exports = {
  findName,
  createProducts,
};