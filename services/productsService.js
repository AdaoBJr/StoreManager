const {
  nameValidation,
  quantityValidation,
  existenceValidation,
  idValidation,
} = require('../validations/productsValidations');

const {
  createProduct,
  findById,
  updateProduct,
  removeProduct,
  updateDB,
} = require('../models/productsModel');

const create = async (name, quantity) => {
  const validName = nameValidation(name);
  if (validName.err) return validName;

  const validQuantity = quantityValidation(quantity);
  if (validQuantity.err) return validQuantity;

  const alreadyExists = await existenceValidation(name);
  if (alreadyExists.err) return alreadyExists;

  return createProduct(name, quantity);
};

const remove = async (id) => {
  const validId = await idValidation(id);
  if (validId.err) return validId;
  
  return removeProduct(id); 
};

const getById = async (id) => {
  const validId = await idValidation(id);
  if (validId.err) return validId;
  
  return findById(id);
};

const update = async (id, name, quantity) => {
  const validName = nameValidation(name);
  if (validName.err) return validName;

  const validQuantity = quantityValidation(quantity);
  if (validQuantity.err) return validQuantity;

  await updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

const updateStock = (id, quantity) => {
  updateDB(id, quantity);
};

module.exports = { 
  create,
  getById,
  update,
  remove,
  updateStock,
};
