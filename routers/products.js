const express = require('express');
const { 
  contCreateProduct,
  contListProducts,
  contListByID,
  contUpdater,
  contEraser,
 } = require('../controllers/productsController');

const router = express.Router();

router.delete('/:id', contEraser);

router.get('/:id', contListByID);

router.get('/', contListProducts);

router.put('/:id', contUpdater);

router.post('/', contCreateProduct);

module.exports = router;