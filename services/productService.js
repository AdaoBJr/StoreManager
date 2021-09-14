const { addProduct, findProduct } = require('../models/productsModel');
const { errorBusines } = require('../errors/errorAPI');

const checkName = async (name, quantity) => {
  const product = await findProduct(name);

  if (product) {
   return errorBusines('Product already exists');
  }

  const productAdd = await addProduct(name, quantity);
  return productAdd;
};

module.exports = {
  checkName,
};