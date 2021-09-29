const Joi = require('joi');
const productsModel = require('../model/productsModel');

const validateProduct = async (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5),
    quantity: Joi.number().integer().min(1),
  })
  .validate({ name, quantity });

  if (error) return error.details[0].message;

  const alreadyExists = await productsModel.findByName(name);
  if (alreadyExists) return 'Product already exists';
};

const createNewProduct = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);

  return newProduct;
};

module.exports = {
  createNewProduct,
  validateProduct,
};
