const { addProduct, findProduct, findAllProducts, findById } = require('../models/productsModel');
const { errorBusiness } = require('../errors/errorAPI');

const checkAllProducts = async () => {
  const allProducts = await findAllProducts();
  return allProducts;
};

const checkProductById = async (id) => {
  const productById = await findById(id);

  if (!productById) {
    return errorBusiness('Wrong id format ');
  }

  return productById;
};

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
  checkAllProducts,
  checkProductById,
};