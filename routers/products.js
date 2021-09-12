const express = require('express');
const { 
  contCreateProduct,
  contListProducts,
  contListByID,
  contUpdater,
 } = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', contListByID);

router.get('/', contListProducts);

router.put('/:id', contUpdater);

router.post('/', contCreateProduct);

module.exports = router;