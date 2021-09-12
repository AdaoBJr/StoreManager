const ProductsModel = require('../models/ProductsModel');

const validName = (name) => {
   const num = 5;
   if (name.length < num) {
     throw {
       status: 422,
       result: {
         err: {
           code: 'invalid_data',
           message: '"name" length must be at least 5 characters long',
        },
      },
    }();
  }
};

const validNameExists = async (name) => {
  const product = await ProductsModel.findByName(name);
  if (product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    }();
  }
};

const validQuantity = (quantity) => {
  const num = 1;
  if (parseInt(quantity, 10) < num || (!quantity)) {
   throw {
    status: 422,
    result: {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    },
   }();
  }
};

module.exports = {
  validName,
  validNameExists,
  validQuantity,

};