const express = require('express');
const { 
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/')
.post(createProduct)
.get(getAllProducts);

router.route('/:id')
.get(getProductById);

module.exports = router;