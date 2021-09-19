const { ObjectId } = require('mongodb');
const dbConnection = require('./connection');

const findByName = async (name) => {
  const db = await dbConnection();
  const product = await db.collection('products').findOne({ name });

  if (!product) {
    return null;
  }
};

const createProduct = async ({ name, quantity }) => {
  const db = await dbConnection();
  const result = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const db = await dbConnection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const getProductsById = async (id) => {
  const db = await dbConnection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) {
    return null;
  }

  return product;
};

module.exports = {
  findByName,
  createProduct,
  getAllProducts,
  getProductsById,
};
