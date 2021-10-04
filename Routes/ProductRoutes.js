const rescue = require('express-rescue');
const controller = require('../controllers/Products');

const route2products = (app) => {
  app.route('/products')
    .get(rescue(controller.selectAll))
    .post(rescue(controller.createProd));
  app.route('/products/:id')
    .get(rescue(controller.selectById))
    .put();
};

module.exports = route2products;
