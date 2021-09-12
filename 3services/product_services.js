const { create, findByName } = require('../4models/product_model');

const validaName = (name) => (!name.length < 6);
const existItem = async (name) => !findByName(name);
const validaQuantity = (quantity) => (quantity <= 0);
const validaNumber = (quantity) => (typeof quantity !== 'number');

// fiz com a ajuda do Renato
// https://github.com/tryber/sd-010-b-store-manager/pull/43/files
const UnprocessableEntity = 422;

const validastring = '"name" length must be at least 5 characters long';

const productExist = 'Product already exists';

const valueQuantityNotValid = '"quantity" must be larger than or equal to 1';

const typeQuantityNotValid = '"quantity" must be a number';

const createproducts = async (name, quantity) => {
  switch (true) {
    case validaName(name):
      return { err: { validastring, UnprocessableEntity } };
    case await existItem(name):
      return { err: { productExist, UnprocessableEntity } }; 
    case validaQuantity(quantity):
      return { err: { valueQuantityNotValid, UnprocessableEntity } };
    case validaNumber(quantity):
      return { err: { typeQuantityNotValid, UnprocessableEntity } };   
    default:
      return create(name, quantity);
  }
};

module.exports = {
  createproducts,
};
