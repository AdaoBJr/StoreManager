const rescue = require('express-rescue');
const productsService = require('../services/productsService');

// const findById = rescue(async (req, res, next) => { /* ... */ }

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
//   getAll,
//   findById,
     create,
};

// const validatedName = productsService.validateLenghtName(req, res, next);
  
// if (validatedName) return next(validatedName);

// const validatedQuantityType = productsService.validateQuantityType(req, res, next);

// if (validatedQuantityType) return next(validatedQuantityType);

// const validatedQuantity = productsService.validateQuantity(req, res, next);

// if (validatedQuantity) return next(validatedQuantity);