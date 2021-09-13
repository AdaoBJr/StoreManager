const ModelProducts = require('../model/modelProducts');

const { isValid } = require('../schemas/schemasValidate');

const getAll = async () => ModelProducts.getAll();

const create = async ({ name, quantity }) => {
  const productValid = await isValid(name, quantity);
  if (productValid.err) return productValid;

  const product = await ModelProducts.create({ name, quantity });
  
  return product;
};

module.exports = { create, getAll };