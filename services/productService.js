const {
  modelCreateProduct,
  modelListProducts,
  modelListById,
} = require('../models/productModel');
const { allValidator } = require('../middleware/product');

const servCreateProduct = async (name, quantity) => {
  const invalidator = await allValidator(name, quantity);
  if (invalidator) {
    return invalidator;
  }
  return modelCreateProduct(name, quantity);
};

const servListByID = async (id) => { 
  const result = await modelListById(id);
  if (!result) return { err: { code: 'invalid_data', message: 'Wrong id format' }, code: 422 };
 return result;
};

const servListProducts = async () => {
  const products = await modelListProducts();
  return products;
};

module.exports = {
  servCreateProduct,
  servListProducts,
  servListByID,
};