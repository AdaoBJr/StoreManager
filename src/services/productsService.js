const productsModel = require('../models/productsModel');

const registerProduct = async (name, quantity) =>
  productsModel.registerProduct(name, quantity);

module.exports = { registerProduct };
