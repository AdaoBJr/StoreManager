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
  updateInventory,
  updateInventoryWhenDelete,
} = require('../../controllers/salesController');

router.post('/', 
  validateQuantity,
  updateInventory,
  create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id',
  validateQuantity,
  updateInventory,
  update);

router.delete('/:id', validateId, updateInventoryWhenDelete, exclude);

module.exports = router;