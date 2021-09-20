const productModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const alreadyExists = await productModel.findByName(name);
  if (alreadyExists) {
    return {
      error: {
        status: 422, // Status 422 - Invalid Data
        message: 'Product already exists',
      },
    };
  }

  const { insertedId } = await productModel.createProduct(name, quantity);

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const productsFound = await productModel.getAllProducts();
  if (!productsFound) {
    return {
      error: {
        status: 404,
        message: 'No products found',
      },
    };
  }

  return {
    products: productsFound,
  };
};

module.exports = {
  createProduct,
  getAllProducts,
};