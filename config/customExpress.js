const express = require('express');
const productsRouter = require('../controller/products');
const { errorMiddleware } = require('../middleware/errorMiddleware');

module.exports = () => {
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/products', productsRouter);

  app.get('/', (_request, response) => {
    response.send();
  });

  app.use(errorMiddleware);
  return app;
};
