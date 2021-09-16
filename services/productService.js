const { addProduct, findProduct } = require('../models/productsModel');
const { errorBusiness } = require('../errors/errorAPI');

const checkName = async (name, quantity) => {
  const fliterName = await findProduct(name);
  if (fliterName) {
    return errorBusiness('Product already exists'); 
  }

  const createProduct = await addProduct(name, quantity);
  return createProduct;
};

module.exports = {
  checkName,
};