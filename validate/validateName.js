const validateName = (req, res, next) => {
    const MIN_LENGTH = 5;
    const { name } = req.body;
    const err = {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
    };

    if (name.length < MIN_LENGTH) {
      return res.status(422).json({ err });
    }
    next();
  };

module.exports = { validateName };