const productsModel = require('../models/productsModel');

const registerProduct = async (name, quantity) => {
  const result = await productsModel.checkName(name);
  if (result.length > 0) {
    return {
      err: { message: 'Product already exists', code: 'invalid_data', status: 422 },
    };
  }
  return productsModel.registerProduct(name, quantity);
};

module.exports = { registerProduct };
