const express = require('express');
const { productsRouter, salesRouter } = require('../controllers');
const { errorMiddleware } = require('../middleware/errorMiddleware');

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/products', productsRouter);
  app.use('/sales', salesRouter);

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorMiddleware);

  return app;
};
