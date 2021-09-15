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

module.exports = {
  validateNameAndQuantity,
};