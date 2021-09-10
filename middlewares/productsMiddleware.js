const { ObjectId } = require('mongodb');
const { validate } = require('../schemas/productsSchema');

const validateProducts = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { code, message } = await validate(name, quantity);

  if (message) {
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message,
      },
    });
  }

  next();
};

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
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
  validateProducts,
  isValidId,
};
