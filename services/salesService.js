const salesModel = require('../models/salesModel');
const validateCreate = require('../validations/sales/validateCreate');

async function getAll() {
  const sales = await salesModel.getAll();
  return sales;
}

async function getById({ id }) {
  if (id.length < 24) return 'id not exists';

  const sale = await salesModel.getById({ id });

  if (!sale) return 'id not exists';
  
  return sale;
}

async function create(body) {
  const validateQuantity = validateCreate.validateQuantity(body);
  if (validateQuantity) return validateQuantity;

  const createdSale = await salesModel.create(body);
  return createdSale;
}

async function update({ id, body }) {
  const validateQuantity = validateCreate.validateQuantity(body);
  if (validateQuantity) return validateQuantity;

  const createdSale = await salesModel.update({ id, body });
  console.log(createdSale);
  return createdSale;
}

async function remove({ id }) {
  if (id.length < 24) return 'id not exists';

  const product = await salesModel.getById({ id });

  if (!product) return 'id not exists';

  await salesModel.remove({ id });
  
  return product;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};