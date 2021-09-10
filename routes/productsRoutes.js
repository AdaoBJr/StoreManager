const express = require('express');
const { create,
  getAll, update,
  remove, getById } = require('../controllers/productsController');

const router = express.Router();

router.route('/').post(validateProduct, create);

router.route('/').get(getAll);

module.exports = router;
