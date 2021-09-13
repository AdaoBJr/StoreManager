const productsModel = require('../models/productsModel');

const validationName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const verifyExistanceProduct = async (name) => {
  const product = await productsModel.findProductByName(name);

  if (product) return true;

  return false;
};

const validationQuantity = (quantity) => {
  if (quantity <= 0) return false;

  return true;
};

const validationTypeQuantity = (quantity) => {
  if (typeof (quantity) !== 'number') return false;

  return true;
};

const createProduct = async ({ name, quantity }) => {
  const creatingProduct = await productsModel.createProductModel({ name, quantity });
  return creatingProduct;
};

// const verifyId = async (id) => {
//   const product = productsModel.getProductById(id);

//   if (!product) {
//     return null;
//   }

//   return product;
// };

// const getAllProducts = async () => {
//   const products = productsModel.getAll();
//   if (!products) {
//     return null;
//   }
//   return products;
// };

module.exports = {
  validationName,
  verifyExistanceProduct,
  validationQuantity,
  validationTypeQuantity,
  createProduct,
  // verifyId,
  // getAllProducts,
};