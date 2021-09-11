const { StatusCodes } = require('http-status-codes');

const Products = require('../services/Products');

const registerNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const addedProduct = await Products.registerNewProduct(name, quantity);
  if (addedProduct.message) {
    return next({
      code: addedProduct.code,
      message: addedProduct.message,
    });
  }

  res.status(StatusCodes.CREATED).json(addedProduct);
};

const getAllProducts = async (req, res, next) => {
  const allProducts = await Products.getAllProducts();
  if (allProducts.message) {
    return next({ message: allProducts.message });
  }

  res.status(StatusCodes.OK).json(allProducts);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.getProductById(id);
  if (product.message) {
    return next({
      code: product.code,
      message: product.message,
    });
  }
  
  res.status(StatusCodes.OK).json(product);
};

module.exports = {
  registerNewProduct,
  getAllProducts,
  getProductById,
};
