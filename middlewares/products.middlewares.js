const { ObjectId } = require('mongodb');
const connection = require('../models/mongoConnection');

const productAlreadyExists = async (req, res, next) => {
  const db = await connection();
  const { name } = req.body;
  const productNameExists = await db.collection('products').findOne({ name });
  if (productNameExists) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  
  next();
};

const isValidProductName = async (req, res, next) => {
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

const isValidProductQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (typeof (quantity) !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  
  next();
};

const isValidProductId = async (req, res, next) => {
  const { id } = req.params;
  if (!id || !ObjectId.isValid(id)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  next();
};

module.exports = {
  productAlreadyExists,
  isValidProductName,
  isValidProductQuantity,
  isValidProductId,
};