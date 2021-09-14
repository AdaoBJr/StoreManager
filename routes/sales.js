const express = require('express');
const controllerProduct = require('../config/depInjection');
const salesValidation = require('../middleware/salesMiddleware');

const defineRoutes = async () => {
  const router = express.Router();
  const { salesController } = await controllerProduct;

  router.get('/', salesController.RootFindAll);
  router.get('/:id', salesController.RootFindById);
  router.delete('/:id', salesController.RootDeleteById);

  router.use(salesValidation);

  router.put('/:id', salesController.RootUpdateById);
  router.post('/', salesController.RootInsert);

  return router;
};

const customRoute = defineRoutes();

module.exports = customRoute;