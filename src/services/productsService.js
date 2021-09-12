const productsModel = require('../models/productsModel');
const { dictionary } = require('../../middlewares');

const registerProduct = async (name, quantity) => {
  const checkedName = await productsModel.checkName(name);
  const newProduct = productsModel.registerProduct(name, quantity);

  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;
  const { alreadyExists } = dictionary().messages;

  if (checkedName.length > 0) {
    return { err: { message: alreadyExists, code: invalidData, status: unprocessableEntity } };
  }

  return newProduct;
};

const listAllProducts = async () => {
  const allProducts = await productsModel.listAllProducts();
  const allProductsFormatted = { products: allProducts };
  return allProductsFormatted;
};

module.exports = { registerProduct, listAllProducts };
