const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

// -----------------------------------------------------------------------------------------------

const createProduct = async (product) => {
  const db = await connection();
  const insertProduct = await db.collection('products').insertOne(product);
  // o insertProduct.ops retorna inserção que acabamos de fazer
  return insertProduct.ops[0];
};

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return { products }; 
};

const getProductById = async (id) => {
  try {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
  } catch (error) {
    rescue(error);
  }
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};