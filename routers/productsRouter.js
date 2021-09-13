const express = require('express');

const router = express.Router();

const { create, getAll } = require('../controllers/productsController');
const {
  validName,
  productExists,
  validQuantity,
  } = require('../middlewares/middlewaresProducts');

router.get('/products', getAll);
router.post('/products', validName, validQuantity, productExists, create);

module.exports = router;
