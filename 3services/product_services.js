const { create, findByName } = require('../4models/product_model');

const validaName = (name) => (name.length < 6);
const validaQuantity = (quantity) => (quantity <= 0);
const validaNumber = (quantity) => (typeof quantity !== 'number');
const existItem = async (name) => (await findByName(name)) !== null;

// fiz com a ajuda do Renato
// https://github.com/tryber/sd-010-b-store-manager/pull/43/files
const code = 'invalid_data';
const validastring = '"name" length must be at least 5 characters long';
const productExist = 'Product already exists';
const valueQuantityNotValid = '"quantity" must be larger than or equal to 1';
const typeQuantityNotValid = '"quantity" must be a number';
const error = (message) => ({ err: { code, message } });

const createproducts = async (name, quantity) => {
  switch (true) {
    case validaName(name):
      return error(validastring);
    case validaQuantity(quantity):
      return error(valueQuantityNotValid);
    case validaNumber(quantity):
      return error(typeQuantityNotValid);
    case await existItem(name):
      return error(productExist);
    default:
      return create(name, quantity);
  }
};

module.exports = {
  createproducts,
};
