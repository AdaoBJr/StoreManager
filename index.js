// Iniciando o project store manager 
// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productController');
const salesController = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

// Products Models
app.get('/products', productsController.findAllProducts);

app.get('/products/:id', productsController.findProductById);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

// Sales Models
app.get('/sales', salesController.findAllSales);

app.get('/sales/:id', salesController.findSalesById);

app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Ouvindo a porta 3000'));