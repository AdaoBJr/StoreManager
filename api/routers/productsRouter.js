const express = require('express');

const router = express.Router();

const { 
  validateQuantity, 
  validateNameLength, 
  validateDistinctName, 
  create,
  getAll,
  getById,
} = require('../../controllers/productsController');

router.post('/',
  validateNameLength,
  validateDistinctName,
  validateQuantity,
  create);

router.get('/', getAll);

router.get('/:id', getById);

module.exports = router;