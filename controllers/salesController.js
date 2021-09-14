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

const getSaleById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const getSale = await SalesService.getSaleById(id);
  if (getSale.err) { return next(getSale.err); }
  res.status(200).json(getSale);
});

const getAllSales = rescue(async (req, res, next) => {
  const allSales = await SalesService.getAll();
  if (allSales.err) return next(allSales.err);
  console.log(allSales);
  res.status(200).json({ sales: allSales });
});

const updateSales = rescue(async (req, res, next) => {
  const { body } = req;
  const { error } = Joi.object({
    productId: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body[0]);
  if (error) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    });
  }
  const { id } = req.params;

  const updateData = await SalesService.updateSale(id, body);
  if (updateData.err) return next(updateData.err);
  console.log(updateData);
  res.status(200).json(updateData);
});

module.exports = {
  saveSale,
  getSaleById,
  getAllSales,
  updateSales,
};