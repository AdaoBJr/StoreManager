const productsModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  productsModel.createProduct({ name, quantity });
};

module.exports = { createProduct };
