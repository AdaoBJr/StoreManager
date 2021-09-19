const express = require('express');
const rescue = require('express-rescue');
const { validateSales } = require('../validate/validateSales');
const { insertSales, getAll, auxGetId } = require('../services/servicesSales');

const route = express.Router();

route.post('/', validateSales, rescue(async (req, res) => {
  const result = await insertSales(req.body);
  const newSales = {
    _id: result.insertedId,
    itensSold: req.body,
  };
  return res.status(200).json(newSales);
}));

route.get('/', rescue(async (_req, res) => {
  const result = await getAll();
  return res.status(200).json(result);
}));

route.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await auxGetId(id);
  if (result.isError === 'errorSales') {
    return next(result);
  }
  return res.status(200).json(result);
}));

module.exports = route;
