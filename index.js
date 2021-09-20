const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.createProduct);

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductById);

app.put('/products/:id', productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

app.post('/sales', salesController.createSale);

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getSalesById);

app.put('/sales/:id', salesController.updateSale);

app.delete('/sales/:id', salesController.deleteSale);

app.listen(PORT, () => { console.log('Systems are online :D'); });
