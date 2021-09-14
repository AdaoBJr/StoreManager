const { Router } = require('express');
const { createSales, getAllSales, getSalesById, updateSales, removeById,
} = require('../controllers/sales_controller');
const { QuantityValidation, IdValidation, IdExistence } = require('../middlewares/sales_midd');

const routes = new Router();

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_request, response) => {
    response.send();
});

routes.post('/sales', QuantityValidation, createSales);
routes.get('/sales', getAllSales);
routes.get('/sales/:id', IdValidation, getSalesById);
routes.put('/sales/:id', QuantityValidation, IdValidation, updateSales);
routes.delete('/sales/:id', IdExistence, removeById);

module.exports = routes; 
