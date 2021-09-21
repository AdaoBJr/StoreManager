const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

module.exports = {
  createProduct,
  getAll,
};
