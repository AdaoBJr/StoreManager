const express = require('express');
const { insertName, getAll, getId } = require('../service/services');
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
  res.status(201).json(opa);
});

route.get('/', async (_req, res) => {
  const auxGetAll = await getAll();
  res.status(200).json(auxGetAll);
});

route.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const auxGetId = await getId(id);
  console.log(auxGetId);
  if (auxGetId.isError) {
    return next(auxGetId);
  }
  res.status(200).json(auxGetId);
});

module.exports = route;
