// Iniciando o project store manager 
// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});
