// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/salesController');
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(bodyParser.json());

app.post('/products', ProductsController.createProduct);
app.get('/products', ProductsController.getAllProducts);
app.get('/products/:id', ProductsController.getProductById);
app.delete('/products/:id', ProductsController.deleteData);
app.put('/products/:id', ProductsController.updateProduct);
app.post('/sales', SalesController.saveSale);
app.get('/sales/:id', SalesController.getSaleById);
app.get('/sales', SalesController.getAllSales);
app.put('/sales/:id', SalesController.updateSales);

app.get('/', (_request, response) => {
  response.send();
});
app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});