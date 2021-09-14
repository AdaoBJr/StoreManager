const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');

const app = express();
app.use(bodyParser.json());

app.post('/products', productController.add);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Online na porta 3000'));
