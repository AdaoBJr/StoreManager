const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.delete('/products/:id', productsController.remove);

app.put('/products/:id', productsController.update);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/sales', salesController.create);

app.put('/sales/:id', salesController.update);

app.delete('/sales/:id', salesController.remove);

app.listen('3000', () => console.log('Running server on port 3000'));
