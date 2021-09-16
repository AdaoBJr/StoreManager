const express = require('express');
const bodyParser = require('body-parser');

const { quantityArray } = require('./schemas/schemasValidate');
const Product = require('./controller/controllerProducts');
const Sales = require('./controller/controllerSales');

const app = express();
app.use(bodyParser.json());

// Product
app.get('/products/:id', Product.findById);

app.put('/products/:id', Product.update);

app.delete('/products/:id', Product.deleteProduct);

app.get('/products', Product.getAll);

app.post('/products', Product.create);

// Sales
app.delete('/sales/:id', Sales.deleteSale);

app.put('/sales/:id', quantityArray, Sales.update);

app.get('/sales/:id', Sales.getById);

app.get('/sales', Sales.getAll);

app.post('/sales', quantityArray, Sales.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Aplicação ouvindo na porta 3000'));
