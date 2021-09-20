const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require('../controllers/productsCtrl');
const {
  nameValidator,
  qtyValidator,
  repeatValidator,
  idValidator,
} = require('../middlewares/productsMw');

const router = express.Router();

router.route('/')
  .post(
    nameValidator,
    qtyValidator,
    repeatValidator,
    createProduct,
  )
  .get(getAllProducts);

router.route('/:id')
  .get(
    idValidator,
    getProductById,
  )
  .put(
    nameValidator,
    qtyValidator,
    updateProduct,
  )
  .delete(
    idValidator,
    removeProduct,
  );

module.exports = router;
