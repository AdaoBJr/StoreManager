const model = require('../models/productModel');

const validateName = async (name) => {
  if (name.length < 5) return 'short name';
  const { products } = await model.getAll();
  const product = products.find((p) => p.name === name);
  if (product) return 'product exist';
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) return 'less equal 0';
  if (typeof quantity !== 'number') return 'not a number';
  return true;
};

const create = async (name, quantity) => {
  const { id } = await model.create(name, quantity);

  return { id };
};

module.exports = {
  create,
  validateName,
  validateQuantity,
}; 
