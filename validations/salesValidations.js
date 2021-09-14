const { ObjectId } = require('mongodb');
const { saleExists } = require('../models/salesModel');
const { findById: findProdById } = require('../models/productsModel');

const errors = {
  invalidQuantity: 'Wrong product ID or invalid quantity',
  notFound: 'Sale not found',
  invalidId: 'Wrong sale ID format',
  insufficientStock: 'Such amount is not permitted to sell',
};

const quantityValidations = (sales) => {
  const isValid = sales.every(({ quantity }) => typeof quantity === 'number' && quantity >= 1);

  if (!isValid) {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.invalidQuantity,
      },
    });
  }
  return {};
};

const idValidation = (id, method) => {
  const result = ObjectId.isValid(id);
  if (!result && method === 'DELETE') {
    return ({ err: {
        code: 'invalid_data',
        message: errors.invalidId,
      },
    });
  }
  if (!result) {
    return ({ err: {
        code: 'not_found',
        message: errors.notFound,
      },
    });
  }
  return {};
};

const existenceValidation = async (id) => {
  const result = await saleExists(id);
  if (!result) {
    return ({ err: {
        code: 'not_found',
        message: errors.notFound,
      },
    });
  }
  return {};
};

const stockVerification = async (sales) => {
  const availableQuantity = await sales.map(async ({ productId, quantity }) => {
    const currProd = await findProdById(productId);
    if (currProd === null) return false;
    return currProd.quantity - quantity > 0;
  });

  const arrResolvedProm = await Promise.all(availableQuantity).then((result) => result);
  if (arrResolvedProm.some((el) => el === false)) {
    return {
      stockError: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
     };
  }
  return {};
};

module.exports = { 
  quantityValidations,
  idValidation,
  existenceValidation,
  stockVerification,
};
