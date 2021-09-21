const Joi = require('@hapi/joi');
const { StatusCodes } = require('http-status-codes');

const productModel = require('../models/productModel');

const validateProduct = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const createProduct = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    return { status: StatusCodes.UNPROCESSABLE_ENTITY, code: 'invalid_data', error };
  }

  const allProducts = await getAll();
  const isNameUsed = allProducts.some((product) => product.name === name);

  if (isNameUsed) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Product already exists' },
    };
  }

  const newProduct = productModel.createProduct(name, quantity);

  return newProduct;
};

async function getById(id) {
  const product = await productModel.getById(id);

  if (!product) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
    };
  }

  return product;
}

const updateProduct = async (id, name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error,
    };
  }

  const updatedProduct = await productModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const productDeleted = await productModel.deleteProduct(id);

  if (!productDeleted) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
    };
  }

  return productDeleted;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
