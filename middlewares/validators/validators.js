const Joi = require('@hapi/joi');
const minNameLength = 5;
const minIdLength = 24;
const maxIdLength = 24;

const checkCreateProductInput = (name, quantity) => 
  Joi.object({
    name: Joi.string().not().empty().min(minNameLength).required(),
    quantity: Joi.number().min(1).not().empty().required()
  }).validate({name, quantity});

const checkIdInput = (id) => Joi.object({
  id:Joi.string().not().empty().min(minIdLength).max(maxIdLength).required()
}).validate({id});

const checkSaleQuantity = (quantity) => { 
  const result = Joi.object({
    quantity: Joi.number().integer().min(1).not().empty().required()
  }).validate({quantity});
  if (result.error) {return false;}
  return true;
};



module.exports = {
  checkCreateProductInput,
  checkIdInput,
  checkSaleQuantity,
};
