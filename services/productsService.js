const productModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const alreadyExists = await productModel.findByName(name);
  if (alreadyExists) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Product already exists',
      },
    };
  }

  const { insertedId } = await productModel.createProduct(name, quantity);

  return {
    id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};