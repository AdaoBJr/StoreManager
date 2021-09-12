const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAllProducts);

app.get('/products/:id', ProductController.findProductById);

app.post('/products', ProductController.createProduct);

app.put('/products/:id', ProductController.updateProduct);

app.delete('/products/:id', ProductController.excludeProduct);

app.post('/sales', SalesController.createSales);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
