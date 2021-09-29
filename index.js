const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createNewProduct);

app.listen(PORT, () => {
  console.log('Online');
});
