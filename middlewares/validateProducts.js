// const MIN_LENGTH = 5;

// const validateName = (req, _res, next) => {
//   const { name } = req.body;

//   if(name.length < MIN_LENGTH ) {
//     next(
//       {
//         code : 'invalid_data',
//         message: 'o campo "name" deve ter mais que 5 caracteres'
//       }
//     );
//   };

//   next();
// };

// module.exports = {validateName};

const Joi = require('@hapi/joi');

const validateProductInput = (req, _res, next) => {
  const minNameLength = 5;

  const { error } = Joi.object({
    name: Joi.string().min(minNameLength).not().empty()
.required(),
    quantity: Joi.number().min(1).not().empty()
.required(),
  }).validate(req.body);
  
  if (error) return next(error);

  next();
};

module.exports = { validateProductInput };