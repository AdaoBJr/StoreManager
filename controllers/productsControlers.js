const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!productsService.validNameService(name)) {
   return res.status(422).json({ 
     err: { 
       code: 'invalid_data', 
       message: '"name" length must be at least 5 characters long', 
      } });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!productsService.validQuantityService(quantity)) {
    return res.status(422).json({ 
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' }, 
    }); 
  }

  if (productsService.validQuantityNumberService(quantity)) {
    return res.status(422).json({ 
      err: { code: 'invalid_data', message: '"quantity" must be a number' }, 
    }); 
  }

  next();
};

const verifyExistance = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await productsService.verifyExistanceService(name);

  if (productExists) {
 return res.status(422).json({ 
    err: { code: 'invalid_data', message: 'Product already exists' }, 
  }); 
}
next();
};

const addNewProduct = (req, res) => {
  const { name, quantity } = req.body;
  productsService.createProductService({ name, quantity })
  .then((result) => res.status(201).json(result));
};

module.exports = {
  router,
  validName,
  validQuantity,
  verifyExistance,
  addNewProduct,
};
