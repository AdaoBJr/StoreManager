const Joi = require('joi');
const productsModels = require('../models/productsModels');

const create = async ({ name, quantity }) => {
  const isExist = await productsModels.isExist({ name });

  if (isExist) return 'produtoExist';

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().strict().min(1).required(),
  }).validate({ name, quantity });

  if (error) return error;

  const { id } = await productsModels
  .create({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
