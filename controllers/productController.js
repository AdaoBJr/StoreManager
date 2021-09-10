const Joi = require('joi');
const productSevice = require('../service/productService');

const create = async (req, res, next) => {
    const { error } = Joi.object({
        name: Joi.string().not().empty()
        .min(5)
        // .message("\"name \" length must be at least 5 characters long")
        .required(),
        quantity: Joi.number().integer().not().empty()
.min(1)
        .required(),
      })
        .validate(req.body);
      if (error) return next(error);
      
    const { name, quantity } = req.body;
    const product = await productSevice
    .create(name, quantity);
    
    return res
    .status(201)
    .json(product);
};

module.exports = {
  create,
};