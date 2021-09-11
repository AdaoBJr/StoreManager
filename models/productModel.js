const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  productExists,
  create,
};