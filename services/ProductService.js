const ProductModel = require('../models/ProductModel');

const findAll = () => ProductModel.findAll();

const findById = async (id) => {
  const product = await ProductModel.findById(id);
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

const create = async (name, quantity) => {
  const existingProduct = await ProductModel.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductModel.create(name, quantity);
};

const update = (id, name, quantity) => ProductModel.update(id, name, quantity);

const exclude = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return ProductModel.exclude(id);
};

module.exports = { create, update, exclude, findAll, findById };
