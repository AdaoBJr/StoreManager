const { ObjectID } = require('mongodb');

const isValidProductQuantity = async (req, res, next) => {
  const newSale = req.body;
  const isValidQuantity = newSale.every(
    ({ quantity }) => quantity > 0,
  );
  if (!isValidQuantity) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  
  next();
};

const isValidProductID = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  
  next();
};

module.exports = {
  isValidProductQuantity,
  isValidProductID,
};