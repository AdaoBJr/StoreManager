const {
  modelCreateProduct,
  modelListProducts,
  modelListById,
  modelUpdater,
} = require('../models/productModel');
const { allValidator, nameQtValidator } = require('../middleware/product');

const servCreateProduct = async (name, quantity) => {
  const invalidator = await allValidator(name, quantity);
  if (invalidator) {
    return invalidator;
  }
  return modelCreateProduct(name, quantity);
};

const servUpdater = async (id, name, quantity) => {
  const invalidator = await nameQtValidator(name, quantity);
  if (invalidator) {
    return invalidator;
  }
  return modelUpdater(id, name, quantity);
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
  servUpdater,
};