const rescue = require('express-rescue');
const controller = require('../controllers/sales');

const sales = (app) => {
    app.route('/sales')
        .get(rescue(controller.allSales))
        .post(rescue(controller.newSale));
    app.route('/sales/:id')
        .get(rescue(controller.selectById))
        .put(rescue(controller.saleUpdate));
};

module.exports = sales;
