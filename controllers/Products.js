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

module.exports = {
  registerNewProduct,
};
