const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const products = require('./router/productsRouter');

const sales = require('./router/productsRouter');

app.use('/products', products);

app.use('/sales', sales);

app.listen(PORT, () => {
  console.log('Online');
});