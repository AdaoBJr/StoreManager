const productsModel = require('../models/productsModel');
const { dictionary } = require('../helpers/dictionary');

const {
  validateNameLength,
  validateQuantityType,
  validateQuantityAmount,
  checkDoubleName } = require('../validations/validation');

const addProduct = async (name, quantity) => {
  if (validateNameLength(name)) return validateNameLength(name);
  if (validateQuantityType(quantity)) return validateQuantityType(quantity);
  if (validateQuantityAmount(quantity)) return validateQuantityAmount(quantity);
  if (await checkDoubleName(name)) return checkDoubleName(name);

  const newProduct = await productsModel.addProduct(name, quantity);

  return newProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  const allProductsFormatted = { products: allProducts };
  return allProductsFormatted;
};

const getProductById = async (id) => {
  const { wrongID } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

  if (id.length !== 24 || !await productsModel.getProductById(id)) {
    return {
      err: { message: wrongID, code: invalidData, status: unprocessableEntity },
    };
  }

  const product = await productsModel.getProductById(id);

  return product;
};

const updateProductById = async (id, name, quantity) => {
  if (validateNameLength(name)) return validateNameLength(name);
  if (validateQuantityType(quantity)) return validateQuantityType(quantity);
  if (validateQuantityAmount(quantity)) return validateQuantityAmount(quantity);

  const attProduct = await productsModel.updateProductById(id, name, quantity);

  return attProduct;
};

const deleteProductById = async (id) => productsModel.deleteProductById(id);

module.exports = {
  addProduct, getAllProducts, getProductById, updateProductById, deleteProductById };
