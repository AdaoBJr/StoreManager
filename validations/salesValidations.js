const { ObjectId } = require('mongodb');
const { saleExists, checkAvailableQuantity } = require('../models/salesModel');

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

const stockVerification = async (req, res, next) => {
  req.body.forEach(async ({ productId, quantity }) => {
    const isAvailable = await checkAvailableQuantity(productId, quantity);
    if (!isAvailable) {
      return res.status(404).json({
      err: {
        code: 'stock_problem',
        message: errors.insufficientStock,
      },
     });
    }
  });

  next();   
};

module.exports = { 
  quantityValidations,
  idValidation,
  existenceValidation,
  stockVerification,
};

// return ({
//   stockError: 'Stock Insufficient',
//   err: {
//     code: 'stock_problem',
//     message: errors.insufficientStock,
//   },
//  });
// }