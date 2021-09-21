const { register } = require('../models/salesModel');
const { findOne } = require('../models/productsModel');

const { error } = require('../middlewares/errorMessage');

const {
  success,
  invalid,
  notFoundCode,
} = error.codeStatus;
const {
  invalidData,
  saleInvalid,
  stockProblem,
  unavailableQuantity,
} = error.errorMessage;

const minQuantity = 1;
const zero = 0;

const firstReturn = { 
  statusCode: invalid,
  infos: {
    err: {
      code: invalidData,
      message: saleInvalid,
    },
  },
};
const secondReturn = { 
  statusCode: notFoundCode,
  infos: {
    err: {
      code: stockProblem,
      message: unavailableQuantity,
    },
  },
};

const firstQuantityValidation = (quantity) => {
  if (quantity < minQuantity || typeof quantity !== 'number') { return false; }
  return true;
};

const secondQuantityValidation = (quantity, availableQuantity) => {
  if (quantity > availableQuantity) { return false; }
  return true;
};

const registerSale = async (productsSold) => {
  let isValid = true;
  let available = true;

  for (let index = zero; index < productsSold.length; index += 1) {
    const saleProduct = productsSold[index];
    const id = saleProduct.productId;
    const { quantity } = saleProduct;
    const product = findOne(id, null);
    const availableQuantity = product.quantity;
    isValid = firstQuantityValidation(quantity);
    available = secondQuantityValidation(quantity, availableQuantity);
  }
  if (!isValid) { return firstReturn; }
  if (!available) { return secondReturn; }
  const result = await register(productsSold);
  return {
    statusCode: success,
    infos: result,
  };
};

module.exports = registerSale;
