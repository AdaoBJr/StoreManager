const express = require('express');
const { insertName, getAll } = require('../service/services');

const route = express.Router();

route.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  const auxServices = await insertName(name, quantity);
  if (auxServices.isError) {
    return next(auxServices);
  }
  const opa = {
    _id: auxServices.insertedId,
    name,
    quantity,
  };
  res.status(200).json(opa);
});

route.get('/', async (_req, res) => {
  const auxGetAll = await getAll();
  res.status(200).json(auxGetAll);
});

module.exports = route;
