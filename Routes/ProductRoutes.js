const rescue = require('express-rescue');
const controller = require('../controllers/Products');

const productRoutes = (app) => {
  app.route('/products')
    .get(rescue(controller.getAll))
    .post(rescue(controller.createProduct));
  app.route('/products/:id')
    .get(rescue(controller.getById))
    .put();
};

module.exports = productRoutes;
