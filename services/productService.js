const productModel = require('../models/productModel');
const { allValidator } = require('../middleware/product');

const servCreateProduct = async (name, quantity) => {
  console.log(name, quantity, 'oi');
  const invalidator = await allValidator(name, quantity);
  if (invalidator) {
    return invalidator;
  }
  return productModel.modelCreateProduct(name, quantity);
}; 

module.exports = {
  servCreateProduct,
};