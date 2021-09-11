const rescue = require('express-rescue');
const productsService = require('../services/productsService');

// const findById = rescue(async (req, res, next) => { /* ... */ }
const getAll = rescue(async (req, res) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
});

const create = rescue(async (req, res, next) => {
  const validationArray = [
    'validateLenghtName',
    'validateQuantityType',
    'validateQuantity',
  ];
  validationArray.forEach((validation) => {
    const validator = productsService[validation](req, res, next);
    if (validator) return next(validator);
  });

  const { name, quantity } = req.body;
  
  const newProduct = await productsService.create(name, quantity);
  // Caso haja erro na criação do autor, iniciamos o fluxo de erro
  if (newProduct.error) return next(newProduct);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(201).json(newProduct);
});

module.exports = {
  getAll,
//   findById,
  create,
};
