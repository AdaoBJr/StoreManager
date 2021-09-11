const express = require('express');

const router = express.Router();

const { 
  validateQuantity,
  create,
  getAll,
  getById,
  update,
} = require('../../controllers/salesController');

router.post('/', 
  validateQuantity,
  create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', 
  validateQuantity,
  update);

module.exports = router;