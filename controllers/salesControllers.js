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

const create = rescue(async (req, res) => {
  const itensSold = req.body;

  isValidNewSales(req.body);

  const id = await salesService.create(itensSold);

  res.status(201).json({ _id: id, itensSold });
});

module.exports = { create };