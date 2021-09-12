const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5 || !name || name === '') {
  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

  module.exports = { isValidName };
