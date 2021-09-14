const express = require('express');
const { productsRoute, salesRoute } = require('../routes');
const { errorMiddleware } = require('../middleware/errorMiddleware');

module.exports = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/products', await productsRoute);
  app.use('/sales', await salesRoute);

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorMiddleware);

  return app;
};
