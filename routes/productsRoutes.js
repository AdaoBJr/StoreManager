const express = require('express');
const { create,
  getAll, update,
  remove, getById } = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(getAll);

module.exports = router;
