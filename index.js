const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductController.createProduct);

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
