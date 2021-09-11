const express = require('express');

const router = express.Router();

const { 
  validateQuantity, 
  validateNameLength, 
  validateDistinctName,
  validateId,
  create,
  getAll,
  getById,
  update,
  exclude,
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

router.delete('/:id', validateId, exclude);

module.exports = router;