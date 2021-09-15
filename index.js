const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/ProductsController');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.addNewProduct);

app.listen(3000, () => {
  console.log('Online now!');
});
