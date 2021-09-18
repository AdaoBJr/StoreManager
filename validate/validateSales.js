const Joi = require('@hapi/joi');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const validateSales = (req, _res, next) => {
  const { error } = Joi.array().items(
    Joi.object().keys({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).not().empty()
      .required(),
    }),
  ).validate(req.body);
  console.log(error);
  if (error) return next(errorBusines('Wrong product ID or invalid quantity'));
  next();
};

module.exports = { validateSales };
