const rescue = require('express-rescue');
const { ObjectID } = require('mongodb');
const ProductsService = require('../services/productServices');
const SalesService = require('../services/salesService');

const verifyProductExistence = async (id) => {
  try {
    const verifyId = await ProductsService.getById(id);
    if (verifyId) return true;
    return false;
  } catch (err) {
    return false;
  }
};
const verifySalesEntry = async (object) => {
  const { productId, quantity } = object;
  const verifyId = await verifyProductExistence(productId);
  return (
    verifyId
    && typeof quantity === 'number'
    && quantity >= 1
  );
};

// Função abaixo baseada em: https://medium.com/@antonioval/making-array-iteration-easy-when-using-async-await-6315c3225838
const verifySalesArray = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await verifySalesEntry(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const subtractSoldQuantities = async (array) => {
  const promisesArray = array.map(async (entry) => {
    const response = await ProductsService.subtractProductsQuantity(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const addSoldQuantities = async (id) => {
  const sale = await SalesService.getById(id);
  console.log(`Sale: ${sale}`);
  const array = sale.itensSold;
  const promisesArray = array.map(async (entry) => {
    const response = await ProductsService.addProductsQuantity(entry);
    return response;
  });
  const validation = await Promise.all(promisesArray);
  return validation;
};

const isTrue = (element) => element === true;

const validateQuantities = (element) => element > 0;

const create = rescue(async (req, res, _next) => {
  const productsArray = req.body;
  const validation = await verifySalesArray(productsArray);
  const response = validation.every(isTrue);
  if (!response) {
    return res.status(422).json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  const newQuantities = await subtractSoldQuantities(productsArray);
  const validQuantities = newQuantities.every(validateQuantities);
  if (!validQuantities) {
    return res.status(404).json({ err: { code: 'stock_problem',
    message: 'Such amount is not permitted to sell' } });
  }
  const created = await SalesService.create(productsArray);
  return res.status(200).json(created);
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await SalesService.getAll();
  return res.status(200).json(response);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' },
    });
  }
  const response = await SalesService.getById(id);
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

const update = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = req.body;
  const validation = await verifySalesArray(sale);
  const verify = validation.every(isTrue);
  if (!verify) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  await SalesService.update(id, sale);

  const newSale = await SalesService.getById(id);
  return res.status(200).json(newSale);
});

const deleteById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  const verifyExistence = await SalesService.getById(id);

  if (!verifyExistence) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  const added = await addSoldQuantities(id);
  await SalesService.deleteById(id);
  console.log(`Added response: ${added}`);
  return res.status(200).json(verifyExistence);
});

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  update,
};
