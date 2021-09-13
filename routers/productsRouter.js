const express = require('express');

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  deleteProduct,
} = require('../controllers/productsController');

const {
  validName,
  productExists,
  validQuantity,
  existsId,
  } = require('../middlewares/middlewaresProducts');

router.get('/products', getAll);
router.get('/products/:id', existsId, getById);
router.post('/products', validName, validQuantity, productExists, create);
router.put('/products/:id', validName, validQuantity, update);
router.delete('/products/:id', existsId, deleteProduct);

module.exports = router;
