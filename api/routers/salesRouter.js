const express = require('express');

const router = express.Router();

const { 
  validateQuantity,
  validateId,
  create,
  getAll,
  getById,
  update,
  exclude,
} = require('../../controllers/salesController');

router.post('/', 
  validateQuantity,
  create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', 
  validateQuantity,
  update);

router.delete('/:id', validateId, exclude);

module.exports = router;