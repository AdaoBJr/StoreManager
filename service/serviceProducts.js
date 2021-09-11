const ModelProducts = require('../model/modelProducts');

const isValid = (name, quantity) => {
  if (name.length < 5 || typeof name !== 'string') return false;
  if (quantity <= 0 || typeof quantity !== 'number') return false;

  return true;
};

const create = async ({ name, quantity }) => {
  const productValid = await isValid(name, quantity);

  if (!productValid) return false;

  const product = await ModelProducts.create({ name, quantity });

  return product;
};

module.exports = { create };