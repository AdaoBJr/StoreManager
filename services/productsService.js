const productsModel = require('../models/productsModel');

const verifyEqualProduct = async (name) => {
  const productExists = await productsModel.productExists(name);
  if (productExists) {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false; 
};

const verifyName = (name) => {
  const minLength = 5;
  if (name.length < minLength) {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const verifyQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

const verifyQuantity = (quantity) => {
  const minQuantity = 1;
  if (Number(quantity) < minQuantity) {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const verifyProduct = async (name, quantity) => {
  // const notHaveEqual = await verifyEqualProduct(name);
  const nameNotIsValid = verifyName(name);
  const quantityNotIsValid = verifyQuantity(quantity);
  const quantityTypeNotIsValid = verifyQuantityType(quantity);
  
  // if (notHaveEqual) return notHaveEqual;
  if (nameNotIsValid) return nameNotIsValid;
  if (quantityNotIsValid) return quantityNotIsValid;
  if (quantityTypeNotIsValid) return quantityTypeNotIsValid;
  return false;
};

const createProduct = async (name, quantity) => {
  const notHaveEqual = await verifyEqualProduct(name);
  const productNotIsValid = await verifyProduct(name, quantity);

  if (notHaveEqual) return notHaveEqual;
  if (productNotIsValid === false) return productsModel.addProduct(name, quantity);
  return productNotIsValid;
};

const verifyExistenceId = async (id) => {
  const product = await productsModel.getProductById(id);
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

const updateProduct = async (name, quantity, id) => {
  const productNotIsValid = await verifyProduct(name, quantity);
  const productExists = await verifyExistenceId(id);
  
  if (productNotIsValid === false && !productExists.err) {
    return productsModel.updateProduct(id, name, quantity);
  }
  return productNotIsValid;
};

module.exports = {
  verifyEqualProduct,
  verifyName,
  verifyQuantity,
  verifyQuantityType,
  createProduct,
  verifyProduct,
  verifyExistenceId,
  updateProduct,
};
