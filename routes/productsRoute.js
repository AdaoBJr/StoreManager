const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controllers/productsController');
const {
  nameValidation,
  quantityValidation,
  alreadyExists,
  idValidation,
} = require('../validations/productsValidations');

const router = express.Router();

router.route('/')
  .post(
    nameValidation,
    quantityValidation,
    alreadyExists,
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
  );

module.exports = router;
