const joi = require('joi');

const validNameQuantity = (req, _res, next) => {
  const { error } = joi.object({
    name: joi.string().min(5).required(),
    quantity: joi.number().integer().min(1).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;
  const regex = /[0-9A-Fa-f]{6}/g;

  if (!regex.test(id)) {
    return next({
      code: 'invalid_data',
      message: 'Wrong id format',
    });
  }

  next();
};

module.exports = {
  validNameQuantity,
  validId,
};