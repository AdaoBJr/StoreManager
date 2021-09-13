const { Router } = require('express');
const { createSales, getAllSales, getSalesById } = require('../controllers/sales_controller');
const { IdValidation, QuantityValidation } = require('../middlewares/sales_midd');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
    response.send();
});

routes.post('/sales', QuantityValidation, createSales);
routes.get('/sales', getAllSales);
routes.get('/sales/:id', IdValidation, getSalesById);

module.exports = routes; 
