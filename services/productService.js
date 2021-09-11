const ProductsModel = require('../models/productModel');

const lengthOfName = (name) => {
  if (name.length <= 5) return false;

  return true;
};

const numberOfQuantity = (quantity) => {
  if (quantity <= 0) return false;
  
  return true;
};

const typeOfQuantity = (quantity) => {
  if (typeof quantity !== 'number') return false;

  return true;
};

const getAllProducts = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);

  if (!product) return null;

  return product;
};

const createProduct = async ({ name, quantity }) => {
  const productExists = await ProductsModel.productExists(name);
  const lengthName = lengthOfName(name);
  const numberQuantity = numberOfQuantity(quantity);
  const typeQuantity = typeOfQuantity(quantity);

  if (productExists) return null;
  if (!lengthName) return false;
  if (!numberQuantity) return false;
  if (!typeQuantity) return false;

  return ProductsModel.create({ name, quantity });
};

module.exports = {
  lengthOfName,
  typeOfQuantity,
  numberOfQuantity,
  getAllProducts,
  getById,
  createProduct,
};
