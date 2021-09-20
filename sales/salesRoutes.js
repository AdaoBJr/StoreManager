const express = require('express');

const router = express.Router();

const { getAll, getById, create } = require('./salesController');

router.route('/')
.get(getAll)
.post(create);

router.route('/:id')
  .get(getById);

module.exports = router;
