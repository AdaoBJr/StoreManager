const Products = require('../models/Products');

const errors = {
  nameExist: { err: {
    code: 'invalid_data', message: 'Product already exists' } },
  name: { err: 
    { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } },
  isNumber: { err: {
    code: 'invalid_data', message: '"quantity" must be a number' } },
  quantity: { err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } },
};

const checkNameExist = async (name) => {
  const find = await Products.findByName(name);
  return find;
};

const checkNameLength = (name) => name.length < 5;

const checkQuantityIsNumber = (quantity) => typeof quantity !== 'number';

const checkQuantity = (quantity) => quantity < 1;

const create = async (name, quantity) => {
  const newProduct = await Products.addProducts(name, quantity);
  return newProduct;
};

const isValid = async (name, quantity) => {
  if (checkNameLength(name)) return { status: 422, message: errors.name };
  if (checkQuantityIsNumber(quantity)) return { status: 422, message: errors.isNumber };
  if (checkQuantity(quantity)) return { status: 422, message: errors.quantity };
  if (await checkNameExist(name)) return { status: 422, message: errors.nameExist };
  
  const newProduct = await create(name, quantity);
  return newProduct;
};

module.exports = {
  create,
  isValid,
};
