const productModel = require('../models/productModel');

const nameValidation = (name) => {
  if (name.length <= 5 || typeof name !== 'string') {
    return false;
  }
  return true;
};

const quantityValidation = (quantity) => {
  if (quantity <= 0 || typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const addProduct = async ({ name, quantity }) => {
  const validatedName = nameValidation(name);
  const validatedQuantity = quantityValidation(quantity);

  if (!validatedName || !validatedQuantity) {
    return false;
  }

  const { id } = await productModel.createProduct({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

const idVerification = async (id) => {
  const product = productModel.getProductsById(id);

  if (!product) {
    return null;
  }

  return product;
};

const getAllProducts = async () => {
  const products = productModel.getAllProducts();

  if (!products) {
    return null;
  }

  return products;
};

module.exports = {
  nameValidation,
  quantityValidation,
  addProduct,
  idVerification,
  getAllProducts,
};
