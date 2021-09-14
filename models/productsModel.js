const connection = require('./connection');

const productExists = async ({ name }) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return await product !== null;
}; 

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProductResult = await db.collection('products').insertOne({ name, quantity });

  return { id: createdProductResult.insertedId, name, quantity };
};

module.exports = {
  create,
  productExists,
};