const productsModel = require('../models/productsModel');
const { dictionary } = require('../../middlewares');

const registerProduct = async (name, quantity) => {
  const result = await productsModel.checkName(name);
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;
  const { alreadyExists } = dictionary().messages;

  if (result.length > 0) {
    return { err: { message: alreadyExists, code: invalidData, status: unprocessableEntity } };
  }

  return productsModel.registerProduct(name, quantity);
};

module.exports = { registerProduct };
