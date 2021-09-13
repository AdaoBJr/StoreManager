const rescue = require('express-rescue');
const Joi = require('joi');
const CustomError = require('../helpers/CustomError');
const salesService = require('../services/salesService');

const isValidNewSales = (sales) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi
      .string()
      .hex()
      .length(24)
      .not()
      .empty()
      .required(),
      quantity: Joi.number().min(1).not().empty(),
    }),
  ).validate(sales);

  if (error) {
    throw new CustomError('invalid_data', 'Wrong product ID or invalid quantity', 422);
  }
};

/* const isValiId = (params) => {
  const { error } = Joi.object({ 
    id: Joi
      .string()
      .hex()
      .length(24)
      .not()
      .empty()
      .required(),
  }).validate(params);

  if (error) {
    throw new CustomError('invalid_data', 'Wrong id format', 422);
  } 
}; */

const create = rescue(async (req, res) => {
  const { body } = req;
  isValidNewSales(body);
  
  const itensSold = body;
  const response = await salesService.create(itensSold);

  res.status(200).json(response);
});

const findAll = rescue(async (_req, res) => {
  const sales = await salesService.findAll();

  res.status(200).json({ sales });
});

const findById = rescue(async (req, res) => {
  // isValiId(req.params);
  
  const { id } = req.params;
  const sale = await salesService.findById({ id });

  // if (!sale) {
  //   throw new CustomError('not_found', 'Sale not found', 404);
  // }
  
  res.status(200).json(sale);
});

module.exports = { create, findAll, findById };

// validação tirado deste forum:
// https://stackoverflow.com/questions/42656549/joi-validation-of-array