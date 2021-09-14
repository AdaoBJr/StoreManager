const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection.getConnection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const addProduct = async (name, quantity) => {
  const db = await connection.getConnection();
  const createProductResult = await db.collection('products').insertOne({ name, quantity });

  return { _id: createProductResult.insertedId, name, quantity };
};

module.exports = { addProduct, productExists };