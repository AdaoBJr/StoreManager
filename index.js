const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', productController.createProduct); // req 1

app.get('/products', productController.findAllProducts); // req 2

app.get('/products/:id', productController.findProductById); // req 2

app.put('/products/:id', productController.updateProduct); // req 3

app.delete('/products/:id', productController.delProduct); // req 4

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
