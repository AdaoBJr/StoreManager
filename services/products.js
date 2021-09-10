const { ObjectId } = require('mongodb');
const { products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { AppError, errorCodes } = require('../utils');

const WRONG_ID_MESSAGE = 'Wrong id format';

ajv.addKeyword('productNameExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkNameExists,
});

const throwError = (code, message) => {
  throw new AppError(code, message);
};

exports.getAllService = async () => productsModel.getAll();

exports.getByIdService = async (id) => {
  let product = null;

  if (ObjectId.isValid(id)) {
    product = await productsModel.getById(id);
    if (product === null) throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
    return product;
  }
  throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
};

exports.updateProductService = async (id, newInfo) => {
  const validate = ajv.getSchema('productsUpdate');
  const isValid = validate(newInfo);

  let updatedProduct = null;

  if (ObjectId.isValid(id) && isValid) {
    updatedProduct = await productsModel.updateProduct(id, newInfo);
    return updatedProduct || throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
  }
  if (!ObjectId.isValid(id)) {
    throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
  } else {
    throwError(errorCodes.INVALID_DATA, validate.errors[0].message);
  }
};

exports.createService = async (product) => {
  const validate = ajv.getSchema('products');
  const isValid = await validate(product);
  return isValid && productsModel.createProduct(product);
};

exports.deleteProductService = async (id) => {
  if (ObjectId.isValid(id)) {
    const deletedProduct = await productsModel.deleteProduct(id);
    if (deletedProduct === null) throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
    return deletedProduct;
  }
  throwError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
};
