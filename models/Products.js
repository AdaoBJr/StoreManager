const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const findProductById = async (id) => {
  const db = await connection();
  const productFound = await db.collection('products').findOne(new ObjectId(id));

  if (!productFound) return null;

  return productFound;
};

const createProduct = async (product) => {
  const { name, quantity } = product;

  const db = await connection();
  const insert = await db.collection('products').insertOne({
    name,
    quantity,
  });
  const createdProduct = insert.ops[0];
  return createdProduct;
};

module.exports = {
  getAllProducts,
  findProductById,
  createProduct,
};
