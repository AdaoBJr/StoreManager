const Joi = require('@hapi/joi');
const productSevice = require('../service/productService');

const create = async (req, res, next) => {
    const { error } = Joi.object({
        name: Joi.string().not().empty()
        .min(5)
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
    console.log(product);
    if (product.err) return res.status(422).json(product);
    
    return res.status(201).json(product);
};

const getAll = async (req, res) => {
    const product = await productSevice.getAll();
    console.log(product);
  
    return res.status(200).json(product);
  };

  const findById = async (req, res, next) => {
    const { id } = req.params;
  
    const product = await productSevice.findById(id);
  
    if (product.error) return next(product.error);
  
    res.status(200).json(product);
  };

module.exports = {
  create,
  getAll,
  findById,
};