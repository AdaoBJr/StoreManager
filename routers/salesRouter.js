const express = require('express');

const {
  createSale,
} = require('../controllers/salesController');

const {
  validSale,  
} = require('../middlewares/validations');

const router = express.Router();

router.route('/')
.post(
  validSale,
  createSale,
);

module.exports = router;