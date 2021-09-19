const connection = require('./connection');

const getByName = async (name) => {
  const db = await connection();
  const foundProduct = await db.collection('products').findOne({ name });
  if (!foundProduct) return false;
  return true;
};

const create = async (product) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne(product);
  return { _id: newProduct.insertedId, ...product };
};
module.exports = {
  create,
  getByName
};