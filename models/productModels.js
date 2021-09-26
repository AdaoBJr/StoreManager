const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const conn = await connection();
  const newProduct = await conn.collection('products').insertOne({ name, quantity });
  return {
    _id: newProduct.insetedId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const conn = await connection();
  const findName = conn.collection('products').findOne({ name });
  return findName;
};

module.exports = { createProduct, getByName };
