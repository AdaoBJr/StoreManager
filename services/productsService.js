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

const getProductById = async (id) => {
  const productFound = await productModel.getProductById(id);
  if (!productFound) {
    return {
      error: {
        status: 422,
        message: 'Wrong id format',
      },
    };
  }

  return { ...productFound };
};

const updateProduct = async (id, name, quantity) => {
  const productFound = await productModel.getProductById(id);
  if (!productFound) {
    return {
      error: {
        status: 422,
        message: 'Wrong id format',
      },
    };
  }

  const updatedProduct = await productModel.updateProduct(id, name, quantity);

  return { ...updatedProduct };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};