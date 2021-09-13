const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productController');
const SalesController = require('./controllers/saleController');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);
app.post('/products/', ProductController.create);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.exclude);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);
app.post('/sales/', SalesController.create);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
}); 
