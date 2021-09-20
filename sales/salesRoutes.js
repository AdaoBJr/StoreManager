const express = require('express');

const router = express.Router();

const { getAll, getById, create, update, remove, validQuantity } = require('./salesController');

router.route('/')
.get(getAll)
.post(create);

router.route('/:id')
  .get(getById)
  .put(validQuantity, update)
  .delete(remove);

module.exports = router;
