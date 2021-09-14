const { Router } = require('express');
const {
  createproduct,
  showProducts,
  updateProducts,
  deleteProducts,
} = require('../2controllers/products_controllers');
const { createsales } = require('../2controllers/sales_controllers');

const DB = new Router();

DB.post('/products', createproduct);
DB.get('/products/:id', showProducts);
DB.get('/products', showProducts);
DB.put('/products/:id', updateProducts);
DB.delete('/products/:id', deleteProducts);

DB.post('/sales', createsales);

module.exports = DB;