const rescue = require('express-rescue');

const controller = require('../controllers/Sales');

const salesRoutes = (app) => {
  app.route('/sales')
    .get()
    .post(rescue(controller.newSale));
};

module.exports = salesRoutes;
