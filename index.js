// Iniciando o project store manager 
// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

app.post('/products', productsController.createProduct);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Ouvindo a porta 3000'));