const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./Controllers/Products');

const { validateName, validateQuantity } = require('./middlwares');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateName, validateQuantity, Product.addProduct);

app.listen(PORT, () => console.log(`Online na porta ${PORT}`));
