const validateQuantity = (req, res, next) => {
    const minimoQuantity = 1;
    const { quantity } = req.body;
    if (quantity < minimoQuantity) {
      const err = {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
      return res.status(422).json({ err });
    }
    if (typeof quantity !== 'number') {
      const err = {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
      return res.status(422).json({ err });
    }
    next();
  };

module.exports = { validateQuantity };