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

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await Products.updateProduct(id, name, quantity);
  if (updatedProduct.message) {
    return next({
      code: updatedProduct.code,
      message: updatedProduct.message,
    });
  }

  res.status(StatusCodes.OK).json(updatedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Products.deleteProduct(id);
  if (deletedProduct.message) {
    return next({
      code: deletedProduct.code,
      message: deletedProduct.message,
    });
  }

  res.status(StatusCodes.OK).json(deletedProduct);
};

module.exports = {
  registerNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
