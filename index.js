// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

const app = express();
app.use(bodyParser.json);

app.post('/products', ProductsController.createProduct);

app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});