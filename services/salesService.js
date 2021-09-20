const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
// const productModel = require('../models/productsModel');

const verifyId = (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return false;
};

const verifyQuantity = (quantity) => {
  const minQuantity = 1;
  if (Number(quantity) < minQuantity || typeof quantity !== 'number') {
    return {
      err: {
        status: 422,
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return false;
};

const createSale = async (newSale) => {
  // const products = await productModel.getAllProducts();
  let salesNotIsValid = false;

  newSale.forEach(({ productId, quantity }) => {
    const idNotIsValid = verifyId(productId);
    const quantityNotIsValid = verifyQuantity(quantity);

    if (idNotIsValid.err) salesNotIsValid = true;
    if (quantityNotIsValid.err) salesNotIsValid = true;
  });

  if (salesNotIsValid === false) return salesModel.addSale(newSale);
  return {
    err: {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
};

const verifyExistenceId = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (!sales) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sales;
};

module.exports = {
  verifyId,
  verifyQuantity,
  createSale,
  verifyExistenceId,
};
