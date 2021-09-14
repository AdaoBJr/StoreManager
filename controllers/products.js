const express = require('express');
const { insertName, auxGetAll, getId } = require('../services/services');
const { validateProductInput } = require('../middleError/validProduct');

const route = express.Router();

route.post('/', validateProductInput, async (req, res, next) => {
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
  return res.status(201).json(opa);
});

route.get('/', async (_req, res) => {
  const getAll = await auxGetAll();
  return res.status(200).json(getAll);
});

route.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const auxGetId = await getId(id);
  console.log(auxGetId);
  if (auxGetId.isError) {
    return next(auxGetId);
  }
  return res.status(200).json(auxGetId);
});

module.exports = route;
