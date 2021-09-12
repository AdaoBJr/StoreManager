const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne(name, quantity);
  return result.ops[0];
};

const findByName = async (name) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });

    return product;
};

  module.exports = {
    createProduct,
    findByName,
  };