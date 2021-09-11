const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

app.use(bodyParser.json());

app.get('/products/:id');

app.get('/products');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createProduct);

app.listen(port, () => console.log(`Listening on port ${port}!`));
