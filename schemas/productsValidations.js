const { ObjectID } = require('mongodb');

const Products = require('../models/Products');

const INVALID_DATA = 'invalid_data';
// const NOTFOUND = 'not_found';

const allProductsNames = async () => {
  const allProducts = await Products.getAllProducts();
  if (allProducts.message) return { message: allProducts.message };

  const allNames = allProducts.map((product) => product.name);

  return allNames;
};

const validateName = async (name) => {
  if (!name || name.length < 5) {
    return {
      code: INVALID_DATA,
      message: '"name" length must be at least 5 characters long',
    }; 
  }

  return true;
};

const validateRepeatedProduct = async (name) => {
  const allNames = await allProductsNames();
  if (allNames.message) return { message: allNames.message };

  const nameAlreadyExists = allNames.find((nameProduct) => nameProduct === name);
  if (nameAlreadyExists) {
    return {
      code: INVALID_DATA,
      message: 'Product already exists',
    }; 
  }

  return true;
};

const validateQuantity = (quantity) => {
  if (!quantity || quantity < 0) {
    return {
      code: INVALID_DATA,
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  if (typeof quantity !== 'number') {
    return {
      code: INVALID_DATA,
      message: '"quantity" must be a number',
    };
  }

  return true;
};

const validateIdMongo = (id) => {
  if (!ObjectID.isValid(id)) {
    return {
      code: INVALID_DATA,
      message: 'Wrong id format',
    };
  }

  return true;
};

const validateIfProductExists = async (count) => {
  if (!count) {
    return {
      code: INVALID_DATA,
      message: 'Wrong id format',
    };
  }

  return true;
};

module.exports = {
  validateName,
  validateRepeatedProduct,
  validateQuantity,
  validateIdMongo,
  validateIfProductExists,
};
