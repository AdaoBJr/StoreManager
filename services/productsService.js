const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const {
  ERROR_PROD_EXISTS, ERROR_NAME_LENGTH, ERROR_QTY_VALUE, ERROR_QTY_TYPE, ERROR_ID_FORMAT,
} = require('./msgErrors');

// VALIDAÇÕES -----------------------------------------------------------------------------------

const validateProductName = async (name, methodPut) => {
  const minLength = 5;
  const { products } = await productsModel.getAllProducts();
  const productExists = products.find((product) => product.name === name);

  if (productExists && !methodPut) {
    throw ERROR_PROD_EXISTS;
  }

  if (name.length < minLength) {
    throw ERROR_NAME_LENGTH;
  }
};

const validateQy = (qty) => {
  const invalidQty = 0;
  if (qty <= invalidQty) {
    throw ERROR_QTY_VALUE;
  }
  if (typeof (qty) === 'string') {
    throw ERROR_QTY_TYPE;
  }
};

const validateId = (id) => (ObjectId.isValid(id));
// verifica se o valor passado é um id no válido - padrão mongoDB

// -----------------------------------------------------------------------------------------------

// REQUISITO 1
const createProduct = async (product) => {
  const { name, quantity } = product;
  await validateProductName(name);
  await validateQy(quantity);
  const createdProduct = await productsModel.createProduct(product);
  return {
    status: 201,
    createdProduct,
  };
};

// REQUISITO 2
const getProducts = async (id) => {
  const products = await productsModel.getAllProducts();
  const product = await productsModel.getProductById(id);
  // const product = products.find(({ _id }) => _id == id);

  if (id) {
    if (!validateId(id) || !product) {
      throw ERROR_ID_FORMAT;
    } else {
      return {
        status: 200,
        product,
      };
    }
  }

  return {
    status: 200,
    products,
  };
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
  getProducts,
};
