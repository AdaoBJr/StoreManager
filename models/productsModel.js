const connect = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connect();
  const insertProduct = await db.collection(process.env.COLLECTION).insertOne({ name, quantity });
  return insertProduct;
};

const findProduct = async (name) => {
  const db = await connect();
  const product = await db.collection(process.env.COLLECTION).findOne({ name });
  return product;
};

module.exports = {
  addProduct,
  findProduct,
};