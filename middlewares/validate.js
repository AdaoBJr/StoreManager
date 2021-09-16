const validateNameAndQuantity = (req, res, next) => {
  const { name, quantity } = req.body;
  const result = {
    err: { code: 'invalid_data' },
  };
  if (name.length < 5) {
    result.err.message = '"name" length must be at least 5 characters long';
    return res.status(422).json(result);
  }
  if (typeof quantity === 'string') {
    result.err.message = '"quantity" must be a number';
    return res.status(422).json(result);
  }
  if (quantity < 1) {
    result.err.message = '"quantity" must be larger than or equal to 1';
    return res.status(422).json(result);
  }
  next();
};

const badResult = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};
const validateSalesQuantities = (req, res, next) => {
  const sales = req.body;
  const result = sales.some((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity === 'string') {
       return true;
    }
    return false;
  });
  if (result === true) {
    return res.status(422).json(badResult);
  }
  next();
};
module.exports = {
  validateNameAndQuantity,
  validateSalesQuantities,
};