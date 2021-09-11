const productsModel = require('../models/productsModels');
const InternarServerError = require('../helpers/InternalServerError');

const create = async ({ name, quantity }) => {
  const product = await productsModel.findName({ name });
  if (product) {
    throw new InternarServerError('invalid_data', 'Product already exists', 422);
  }

  const response = await productsModel.create({ name, quantity });
  return response;
};

module.exports = { create };

// peguei a dica de como criar erro personalizando desse canal:
// https://www.youtube.com/watch?v=qHfZxpRqxYw