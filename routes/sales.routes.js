const { Router } = require('express');
const {
  createNewSale,
  listAllSales,
  saleById,
  updateSale,
  deleteSale,
} = require('../controllers/sales.controllers');
const { isValidProductQuantity, isValidProductID } = require('../middlewares/sales.middlewares');

const routes = new Router();

routes.get('/', (_req, res) => {
  res.send();
});

routes.post('/sales',
  isValidProductQuantity,
  createNewSale);

routes.get('/sales', listAllSales);

routes.get('/sales/:id',
saleById);

routes.put('/sales/:id',
isValidProductQuantity,
updateSale);

routes.delete('/sales/:id',
isValidProductID,
deleteSale);

module.exports = routes;