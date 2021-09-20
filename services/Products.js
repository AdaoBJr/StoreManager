// const { default: rescue } = require('express-rescue');
const Products = require('../models/Products');
const { isNameValid,
  isQuantityValid,
  isQuantityValidTwo,
} = require('../schema/validations');

const create = async (name, quantity) => {
  const validateName = isNameValid(name);
  if (validateName.err) return validateName;

  const validateQuantity = isQuantityValid(quantity);
  if (validateQuantity.err) return validateQuantity;

  const valivalidateQuantityTwo = isQuantityValidTwo(quantity);
  if (valivalidateQuantityTwo.err) return valivalidateQuantityTwo;

  const existingProduct = await Products.findByName(name);
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return Products.create(name, quantity);
};

const getAll = async () => Products.getAll();

const findById = async (id) => {
  const product = await Products.findById(id);
  // const productExists = isProductExists(product);

  // if (productExists.err) return productExists;

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return Products.findById(id);
};

const update = async (id, name, quantity) => {
  const validateName = isNameValid(name);
  if (validateName.err) return validateName;

  const validateQuantity = isQuantityValid(quantity);
  if (validateQuantity.err) return validateQuantity;

  const valivalidateQuantityTwo = isQuantityValidTwo(quantity);
  if (valivalidateQuantityTwo.err) return valivalidateQuantityTwo;

  return Products.update(id, name, quantity);
};

const deleteProduct = async (id) => Products.deleteProduct(id);

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteProduct,
};