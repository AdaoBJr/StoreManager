const productsModel = require('../models/productsModels');
const CustomError = require('../helpers/CustomError');

const create = async ({ name, quantity }) => {
  const product = await productsModel.findName({ name });
  if (product) {
    throw new CustomError('invalid_data', 'Product already exists', 422);
  }

  const response = await productsModel.create({ name, quantity });
  return response;
};

const findAll = async () => {
  const products = await productsModel.findAll();

  return products;
};

const findById = async ({ id }) => {
  const products = await productsModel.findById({ id });
  return products;
};

module.exports = { create, findAll, findById };

// peguei a dica de como criar erro personalizando desse canal:
// https://www.youtube.com/watch?v=qHfZxpRqxYw