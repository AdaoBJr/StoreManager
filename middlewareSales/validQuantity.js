const isValidQuantity = (req, res, next) => {
  const [{ quantity }] = req.body;

  if (quantity < 1) {
  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    next();
};

  module.exports = { isValidQuantity };
