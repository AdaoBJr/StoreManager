const connection = require('./connection');

const modelCreateProduct = async (name, quantity) => {
  const db = await connection();
  const products = await db.collection('products').insertOne({ name, quantity });

return { code: 201, prod: { _id: products.insertedId, name, quantity } };
};

module.exports = {
  modelCreateProduct,
};