const connection = require('./connection');

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { id, name, quantity };
};

module.exports = {
  createProduct,
  findProductByName,
};
