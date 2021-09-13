const { ObjectId } = require('mongodb');
const Joi = require('joi');
const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');

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

const isValidQuantityProducts = async (productId, quantity) => {
  // console.log(productId);
  
  const result = await getById(productId);
  return console.log(result);
};

const create = async ({ itensSold }) => {
  
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().length(24).required(),
    quantity: Joi.number().strict().min(1).required(),
  })).validate(itensSold);

  if (error) return error;

  for (let index = 0; index < itensSold.length; index += 1) {
    const { productId, quantity } = itensSold[index];
    const result = await productsModels.getById({ id: productId });
    if (result.quantity < quantity) return 'quantidade insuficiente';
  }

  // itensSold.forEach(async ({ productId, quantity }) => {
    
  //   // console.log(result.quantity < quantity);
  //   if (result.quantity < quantity) return true;
  // });

  const { id } = await salesModels
  .create(itensSold);

  return {
    id,
    itensSold,
  };
};

const updateById = async ({ id, itensSold }) => {
  const { error } = Joi.array().items(Joi.object({
    productId: Joi.string().length(24).required(),
    quantity: Joi.number().strict().min(1).required(),
  })).validate(itensSold);

  if (error) return error;

  const updateSales = await salesModels.updateById({ id, itensSold });
  return updateSales;
};

const deleteById = async ({ id }) => {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) return 'idNaoExiste';

  const deleteSale = await salesModels.deleteById({ id });
  return deleteSale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
