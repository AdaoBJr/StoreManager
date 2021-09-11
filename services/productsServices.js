const Joi = require('joi');
const { ObjectId } = require('mongodb');
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

const getAll = async () => {
  const allProducts = await productsModels.getAll();
  return allProducts;
};

const getById = async ({ id }) => {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) return 'idNaoExiste';

  const allProducts = await productsModels.getById({ id });
  return allProducts;
};

const updateById = async ({ id, name, quantity }) => {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) return 'idNaoExiste';

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().strict().min(1).required(),
  }).validate({ name, quantity });

  if (error) return error;

  const updateProduct = await productsModels.updateById({ id, name, quantity });
  return updateProduct;
};

const deleteById = async ({ id }) => {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) return 'idNaoExiste';

  const deleteProduct = await productsModels.deleteById({ id });
  return deleteProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
