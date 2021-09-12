const express = require('express');
const { 
  contCreateProduct,
  contListProducts,
  contListByID,
 } = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', contListByID);

router.get('/', contListProducts);

router.post('/', contCreateProduct);

module.exports = router;