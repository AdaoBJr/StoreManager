const rescue = require('express-rescue');
const controller = require('../controllers/Products');

const route2products = (app) => {
  app.route('/products')
    .get(rescue(controller.selectAll))
    .post(rescue(controller.createProd));
  app.route('/products/:id')
    .get(rescue(controller.selectById))
    .put(rescue(controller.updateProd))
    .delete(rescue(controller.deleteProd));
};

module.exports = route2products;
