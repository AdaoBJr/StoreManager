const express = require('express');
const controllerProduct = require('../config/depInjection');
const {
  validateName,
  validateQuantity,
} = require('../middleware/productsMiddleware');

const defineRoutes = async () => {
  const router = express.Router();
  const { productController } = await controllerProduct;

  router.get('/', productController.RootFindAll);
  router.get('/:id', productController.RootFindById);
  router.delete('/:id', productController.RootDeleteById);

  router.use(validateName, validateQuantity);

  router.put('/:id', productController.RootUpdateById);
  router.post('/', productController.RootInsert);

  return router;
};
const customRoute = defineRoutes();
module.exports = customRoute;
