const Joi = require('joi');
const { ObjectID } = require('mongodb');
const productsModel = require('../models/productsModel');

const validateProduct = async (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5),
    quantity: Joi.number().integer().min(1),
  })
  .validate({ name, quantity });

  if (error) return error.details[0].message;

  const alreadyExists = await productsModel.findByName(name);
  if (alreadyExists) return 'Product already exists';
};

const createNewProduct = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);

  return newProduct;
};

const validateId = async (id) => {
  const isValidId = ObjectID.isValid(id);

  if (!isValidId) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const getAllProducts = async () => productsModel.getAllProducts();

const updateProduct = async (id, name, quantity) => {
  const newProduct = await productsModel.updateOne(id, name, quantity);

  return newProduct;
};

const deleteProduct = async (id) => {
  const deleted = await productsModel.deleteProduct(id);

  if (deleted > 0) return true;

  return {
    errorMessage: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    },
  };
};

module.exports = {
  createNewProduct,
  validateProduct,
  getProductById,
  getAllProducts,
  validateId,
  updateProduct,
  deleteProduct,
};
