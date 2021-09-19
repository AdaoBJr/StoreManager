const express = require('express');
const bodyParser = require('body-parser');

const { getAllProducts, getProductById, addNewProduct } = require('./controllers/products');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.post('/products', addNewProduct);

if (process.env.CI === 'true') {
  console.log('Running in CI mode');
} else console.log('Running in local mode');

app.listen(process.env.PORT || 3000);
