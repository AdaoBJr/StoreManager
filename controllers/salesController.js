const Joi = require('joi');
const rescue = require('express-rescue');
const SalesService = require('../service/salesService');

const saveSale = rescue(async (req, res, _next) => {
  const { error } = Joi.object({
    productId: Joi.string().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body[0]);
  if (error) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    });
  }
  const { body } = req;
  const newSale = await SalesService.saveSale(body);
  res.status(200).json(newSale);
});

module.exports = {
  saveSale,
};