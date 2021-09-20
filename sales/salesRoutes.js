const express = require('express');

const router = express.Router();

const { getAll, getById } = require('./salesController');

router.route('/:id')
  .get(getById);

router.route('/')
  .get(getAll);

module.exports = router;
