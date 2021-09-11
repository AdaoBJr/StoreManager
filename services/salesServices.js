const { ObjectId } = require('mongodb');
const Joi = require('joi');
const salesModels = require('../models/salesModels');

const create = async ({ itensSold }) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().length(24).required(),
    quantity: Joi.number().strict().min(1).required(),
  })).validate(itensSold);

  if (error) return error;

  const { id } = await salesModels
  .create(itensSold);

  return {
    id,
    itensSold,
  };
};

const getAll = async () => {
  const allSales = await salesModels.getAll();
  return allSales;
};

const getById = async ({ id }) => {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) return 'idNaoExiste';

  const allSales = await salesModels.getById({ id });
  return allSales;
};

module.exports = {
  create,
  getAll,
  getById,
};
