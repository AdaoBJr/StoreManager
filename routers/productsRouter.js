const express = require('express');

const router = express.Router();

const { create, getAll, getById } = require('../controllers/productsController');
const {
  validName,
  productExists,
  validQuantity,
  existsId,
  } = require('../middlewares/middlewaresProducts');

router.get('/products', getAll);
router.get('/products/:id', existsId, getById);
router.post('/products', validName, validQuantity, productExists, create);

module.exports = router;
