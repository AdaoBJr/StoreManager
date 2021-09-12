const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routers/products');

const app = express();

app.use(bodyParser.json());

app.use('/products', products);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('rodando http://localhost:3000/'); });