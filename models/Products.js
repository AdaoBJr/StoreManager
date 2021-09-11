const connection = require('./connection');

const registerNewProduct = async (name, quantity) => {
  try {
    await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => {
        const addedProduct = {
          _id: result.insertedId,
          name,
          quantity,
        };
        return addedProduct;
      });
  } catch (error) {
    return {
      message: error,
    };
  }
};

const getAllProducts = async () => {
  try {
    await connection()
      .then((db) => db.collection('products').find().toArray())
      .then((result) => result);
  } catch (error) {
    return {
      message: error,
    };
  }
};

module.exports = {
  registerNewProduct,
  getAllProducts,
};
