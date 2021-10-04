const rescue = require('express-rescue');
const controller = require('../controllers/sales');

const sales = (app) => {
    app.route('/sales')
        .post(rescue(controller.newSale));
};

module.exports = sales;
