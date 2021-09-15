const productModel = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const { ops } = await productModel.createProduct({ name, quantity });
  return {
    status: 201,
    messageResult: ops[0],
  };
};

module.exports = {
  createProduct,
};
