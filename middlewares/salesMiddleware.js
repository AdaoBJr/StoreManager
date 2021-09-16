const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('mongodb');

const validateQuantity = async (quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return null;
};

const checkQuantity = (req, res, next) => {
  const itemsSold = req.body;
  itemsSold.map(async (item) => {
    const result = await validateQuantity(item.quantity);
    if (result) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  });

  next();
};

const checkValidId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
}

  next();
};

module.exports = { checkQuantity, checkValidId };
