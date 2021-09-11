const express = require('express');

const router = express.Router();

const {
  validName,
  validQuantity,
  create,
  getAll,
  existsProduct,
} = require('../controllers/productsController');

router.get('/', getAll);
router.post('/', validName, validQuantity, existsProduct, create);

module.exports = router;
