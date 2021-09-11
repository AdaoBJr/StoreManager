const { ObjectId } = require('mongodb');

const connection = require('./connection');

const registerNewProduct = async (name, quantity) => {
  try {
    const addedProduct = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => ({
          _id: result.insertedId,
          name,
          quantity,
      }));
    return addedProduct;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const getAllProducts = async () => {
  try {
    const allProducts = await connection()
      .then((db) => db.collection('products').find().toArray())
      .then((result) => result);
    return allProducts;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const getProductById = async (id) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').findOne(ObjectId(id)))
      .then((result) => result);
    return product;
  } catch (error) {
    return {
      message: error,
    };
  }
};

module.exports = {
  registerNewProduct,
  getAllProducts,
  getProductById,
};
