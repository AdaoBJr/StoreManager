const productModel = require('../models/productModel');

const productExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await productModel.productExists({ name });
  if (product) { 
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  console.log(product, 'model');
  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
          
    });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      
    });
  }
  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

module.exports = {
  productExists,
  validateName,
  validateQuantity,
};
