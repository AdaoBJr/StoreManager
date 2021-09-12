const rescue = require('express-rescue');
const ProductsService = require('../services/productServices');
const SalesService = require('../services/salesService');

const verifyExistence = async (id) => {
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
  const verifyId = await verifyExistence(productId);
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
  const created = await SalesService.create(productsArray);
  return res.status(200).json(created);
});

module.exports = {
  create,
};
