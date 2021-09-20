const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', productController.createProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
