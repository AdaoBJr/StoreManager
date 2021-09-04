const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  const { _id } = result.ops[0];
  return { _id, name, quantity };
};

const findName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({name});
  return result;
};

module.exports = {
  createProduct,
  findName,
};
