const Products = require('../models/Products');
const { isNameValid,
  isQuantityValid,
  isQuantityValidTwo } = require('../schema/validations');

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);
  const validateName = isNameValid(name);
  const validateQuantity = isQuantityValid(quantity);
  const valivalidateQuantityTwo = isQuantityValidTwo(quantity);

  if ()

    if (existingProduct) {
      return {
        error: {
          code: 'alreadyExists',
          message: 'Um produto já existe com esse nome',
        },
      };
    }

  return Products.create(name, quantity);
};

module.exports = {
  create,
};