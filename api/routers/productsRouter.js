const express = require('express');

const router = express.Router();

const { 
  validateQuantity, 
  validateNameLength, 
  validateDistinctName, 
  createProduct,
} = require('../../controllers/productsController');

router.post('/',
  validateNameLength,
  validateDistinctName,
  validateQuantity,
  createProduct);

module.exports = router;