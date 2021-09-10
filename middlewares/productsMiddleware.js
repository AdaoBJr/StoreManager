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

module.exports = {
  validateProducts,
};
