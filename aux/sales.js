const ProductsService = require('../services/productServices');
const SalesService = require('../services/salesService');

const verifyProductExistence = async (id) => {
  try {
    const verifyId = await ProductsService.getById(id);
    if (verifyId) return true;
    return false;
  } catch (err) {
    return false;
  }
};
const verifySalesEntry = async (object) => {
  const { productId, quantity } = object;
  const verifyId = await verifyProductExistence(productId);
  return (
    verifyId
    && typeof quantity === 'number'
    && quantity >= 1
  );
};

// Função abaixo baseada em: https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
const verifySalesArray = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await verifySalesEntry(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const subtractSoldQuantities = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await ProductsService.subtractProductsQuantity(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const addSoldQuantities = async (id) => {
  const sale = await SalesService.getById(id);
  console.log(`Sale: ${sale}`);
  const array = sale.itensSold;
  const promisesArray = array.map(async (entry) => {
    const response = await ProductsService.addProductsQuantity(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const isTrue = (element) => element === true;

const validateQuantities = (element) => element > 0;

module.exports = {
  addSoldQuantities,
  isTrue,
  subtractSoldQuantities,
  validateQuantities,
  verifySalesArray,
};
