const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routers/products');
const sales = require('./routers/sales');

const app = express();

app.use(bodyParser.json());

app.use('/products', products);

app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('rodando http://localhost:3000/'); });