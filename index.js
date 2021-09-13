const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App na porta ${PORT}`);
});

app.post('/products', productController.registerNewProduct);

app.get('/products', productController.getProducts);

app.get('/products/:id', productController.getProductById);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);