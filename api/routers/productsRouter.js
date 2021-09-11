const express = require('express');

const router = express.Router();

const { 
  validateQuantity, 
  validateNameLength, 
  validateDistinctName, 
  create,
  getAll,
  getById,
  update,
} = require('../../controllers/productsController');

router.post('/',
  validateNameLength,
  validateDistinctName,
  validateQuantity,
  create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', 
  validateNameLength,
  validateQuantity,
  update);

module.exports = router;