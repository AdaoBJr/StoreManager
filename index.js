const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/ProductsController');
const salesController = require('./controllers/SalesController');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.addNewProduct);

app.get('/products/:id', productsController.getProductId);

app.get('/products', productsController.getProducts);

app.put('/products/:id', productsController.productUpdate);

app.delete('/products/:id', productsController.productDelete);

app.post('/sales', salesController.addNewSale);

app.get('/sales/:id', salesController.getSaleById);

app.get('/sales', salesController.getAllSales);

app.put('/sales/:id', salesController.updateSale);

app.delete('/sales/:id', salesController.deleteSale);

app.listen(3000, () => {
  console.log('Online now!');
});
