const joi = require('@hapi/joi');

const errorProducts = (req, _res, next) => {
 const { error } = joi.object({
    name: joi.string().min(5).not().empty()
.required(),
    quantity: joi.number().min(1).not().empty()
.required(),
  }).validate(req.body);
  if (error) {
   return next(error);
  }

   return next();
};

module.exports = errorProducts;