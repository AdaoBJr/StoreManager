const rescue = require('express-rescue');
const express = require('express');
const productsModel = require('../models/productsModel');

const router = express.Router();

const validName = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5 || typeof (name) !== 'string') {
   return { 
     err: { 
       code: 'invalid_data', 
       message: '"name" length must be at least 5 characters long', 
      } };
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0 || typeof (quantity) !== 'number' || Number.isInteger(quantity)) {
    return res.status(422).json({ 
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' }, 
    }); 
  }

  next();
};

const verifyExistance = (req, res, next) => {
  const productExists = productsModel.findProductByName(name);

  if (productExists) {
 res.status(422).json({ 
    err: { code: 'invalid_data', message: 'Product already exists' }, 
  }); 
}
next();
};

const addNewProduct = (req, res) => {
  const { name, quantity } = req.body;
  productsModel.createProduct({ name, quantity })
  .then((result) => res.status(201).json(result));
};

module.exports = {
  router,
  validName,
  validQuantity,
  verifyExistance,
  addNewProduct,
};