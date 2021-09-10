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

const getAll = (req, res) => productsService.getAll()
.then((result) => res.status(200).json({ products: result }));

const getById = (req, res) => {
  const { id } = req.params;
  productsService.getById(id)
  .then((result) => {
    if (result === null) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
  return res.status(200).json(result);
})
  .catch(() => res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } }));
};

const editProduct = (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  productsService.editProduct(id, name, quantity)
  .then((result) => res.status(200).json(result));
};

const getByIdBeforeDelete = (req, res, next) => {
  const { id } = req.params;
  productsService.getById(id)
  .then((result) => {
    if (!result) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
  return res.status(200).json(result);
})
  .catch(() => res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } }));
  next();
};

const deleteProduct = (req, _res) => {
  const { id } = req.params;
  productsService.deleteProduct(id);
};

module.exports = {
  router,
  validName,
  validQuantity,
  verifyExistance,
  addNewProduct,
  getAll,
  getById,
  editProduct,
  getByIdBeforeDelete,
  deleteProduct,
};