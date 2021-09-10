const express = require('express');

const router = express.Router();

const { 
  validQuantity, 
  validName, 
  validNameDistintic, 
  createProduct,
} = require('../../controllers/productsController');

router.post('/',
  validName,
  validNameDistintic,
  validQuantity,
  createProduct);

module.exports = router;