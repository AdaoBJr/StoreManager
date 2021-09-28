const rescue = require('express-rescue');
const controller = require('../Controllers/products');

const productRoutes = (app) => {
  app.route('/products')
    .post(rescue(controller.createProduct));
};

module.exports = productRoutes;
