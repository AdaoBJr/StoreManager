const productsModel = require('../models/productsModel');

const validNameService = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const validQuantityService = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};
 
const validQuantityNumberService = (quantity) => {
if (typeof (quantity) !== 'number') return true;
return false;
};

const verifyExistanceService = async (name) => {
  const productExists = await productsModel.findProductByName(name);
  if (productExists) return true;
  return false;
};

const createProductService = async ({ name, quantity }) => {
 const newProduct = await productsModel.createProduct({ name, quantity });

 return newProduct;
};

module.exports = {
  validNameService,
  validQuantityService,
  validQuantityNumberService,
  verifyExistanceService,
  createProductService,
};
