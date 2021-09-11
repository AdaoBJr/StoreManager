const express = require('express');

const router = express.Router();

const { 
  validateQuantity,
  create,
  getAll,
  getById,
} = require('../../controllers/salesController');

router.post('/', 
  validateQuantity,
  create);

router.get('/', getAll);

router.get('/:id', getById);

module.exports = router;