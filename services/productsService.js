const Joi = require('joi');
const productsModel = require('../model/productsModel');

const createNewProduct = async (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5),
    quantity: Joi.number().integer().min(1),
  })
  .validate({ name, quantity });

  if (error) console.log('Error no createNewProduct do productService');

  const newProduct = await productsModel.create(name, quantity);

  return newProduct;
};

module.exports = {
  createNewProduct,
};
