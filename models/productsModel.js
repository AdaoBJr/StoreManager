const connection = require('./connection');

async function createProduct({ name, quantity }) {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return createdProduct.ops[0];
}

async function getProductByName(name) {
  const db = await connection();

  const product = await db.collection('products').findOne({ name });
  if (!product) return null;

  return product;
}

module.exports = {
  createProduct,
  getProductByName,
};