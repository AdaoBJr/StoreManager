const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/products', productController.findAllProducts);

app.get('/products/:id', productController.findProductById);

app.post('/products', productController.createProduct);

app.put('/products/:id', productController.updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
