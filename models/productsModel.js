const connection = require('./connection');

const registerProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const findProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product !== null;
};

module.exports = {
  registerProduct,
  findProduct,
};
