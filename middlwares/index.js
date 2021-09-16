const { ObjectId } = require('mongodb');

const validateName = (req, res, next) => {
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

const validateQuantity = (req, res, next) => {
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

const validateProductId = (req, res, next) => {
  const { body } = req;

  if (body.some(({ productId }) => !ObjectId.isValid(productId))) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or quantity',
      },
    });
  }

  next();
};

const validateProductQuantity = (req, res, next) => {
  const { body } = req;

  if (body.some(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or quantity',
      },
    });
  }

  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateProductId,
  validateProductQuantity,
};
