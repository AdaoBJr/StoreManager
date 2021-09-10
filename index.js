const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createContr);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});