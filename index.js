const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
.get(productController.getOneProduct)
.put(productController.updateProduct)
.delete(productController.deleteProduct);

app.route('/products')
.post(productController.createNewProduct)
.get(productController.getAllProducts);

app.route('/sales')
.get(salesController.getAllSales)
.post(salesController.insertSales);

app.route('/sales/:id')
.get(salesController.getSaleById)
.put(salesController.updateSale);

app.listen(PORT, () => {
  console.log('Online');
});
