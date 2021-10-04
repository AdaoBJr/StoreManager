const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');

const productsService = require('../services/productsServices');
const salesService = require('../services/salesService');

const verifyExistenceProduct = async (id) => {
  try {
    const verifyId = await productsService.getById(id);
    if (verifyId) { return true; }
    return false;
  } catch (err) { return false; }
};

const verifySalesEntry = async (object) => {
  const { productId, quantity } = object;
  const verifyId = await verifyExistenceProduct(productId);

  return (
    verifyId && typeof quantity === 'number' && quantity >= 1
  );
};

// https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
const verifySalesArray = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await verifySalesEntry(entry);
    return response;
  });

  const validation = await Promise.all(promisesArray);
  return validation;
};

const isTrue = (element) => element === true;

const create = rescue(async (req, res, _next) => {
  const productsArray = req.body;
  const validation = await verifySalesArray(productsArray);
  const response = validation.every(isTrue);

  if (!response) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  const created = await salesService.create(productsArray);
  return res.status(200).json(created);
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await salesService.getAll();

  return res.status(200).json(response);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }

  const response = await salesService.getById(id);

  if (!response) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  return res.status(200).json(response);
});

module.exports = {
  create,
  getAll,
  getById,
};
