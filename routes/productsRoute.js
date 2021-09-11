const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require('../controllers/productsController');
const {
  nameValidation,
  quantityValidation,
  existenceValidation,
  idValidation,
} = require('../middlewares/productsValidations');

const router = express.Router();

router.route('/')
  .post(
    nameValidation,
    quantityValidation,
    existenceValidation,
    createProduct,
  )
  .get(getAllProducts);

router.route('/:id')
  .get(
    idValidation,
    getProductById,
  )
  .put(
    nameValidation,
    quantityValidation,
    updateProduct,
  )
  .delete(
    idValidation,
    removeProduct,
  );

module.exports = router;
