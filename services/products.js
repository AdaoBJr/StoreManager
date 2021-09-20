const { ObjectId } = require('mongodb');
const productsModel = require('../models/products');

const validateProductDataName = async (name) => {
  if (typeof name !== 'string' || name.length < 5) {
    return ({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
};
const validateProductUniqueName = async (name) => {
  if (await productsModel.getProductByNameFromDB(name)) {
    return ({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const validateProductDataQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= 0) {
    return ({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
};

const addNewProduct = async (product) => {
  const err = await validateProductDataName(product.name)
    || await validateProductUniqueName(product.name)
    || await validateProductDataQuantity(product.quantity);
  if (err) return ({ ...err, wasAnError: true });
  return productsModel.addProductToDB(product);
};

const getProductById = async (id) => {
  const err = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
    wasAnError: true,
  };
  if (!ObjectId.isValid(id)) {
    return err;
  }
  return (await productsModel.getProductByIdFromDB(id)) || err;
};

const updateProductById = async (id, product) => {
  const err = (await validateProductDataName(product.name))
  || (await validateProductDataQuantity(product.quantity));
  if (err) return ({ ...err, wasAnError: true });
  return productsModel.updateProductByIdInDB(id, product);
};

const deleteProductById = async (id) => {
  const err = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
    wasAnError: true,
  };
  if (!ObjectId.isValid(id)) return err;
  const data = await productsModel.getProductByIdFromDB(id);
  productsModel.deleteProductByIdFromDB(id);
  return data;
};

module.exports = {
  addNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
