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

const updateProduct = async (id, name, quantity) => {
  try {
    const updatedProduct = await connection()
      .then((db) => db.collection('products').update({ _id: ObjectId(id) }, { name, quantity }))
      .then(() => ({
          _id: id,
          name,
          quantity,
        }));
    return updatedProduct;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProductCount = await connection()
      .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
      .then(({ deletedCount }) => deletedCount);
    return deletedProductCount;
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
  updateProduct,
  deleteProduct,
};
