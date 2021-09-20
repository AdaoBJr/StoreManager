const express = require('express');
const bodyParser = require('body-parser');
const {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
} = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/products', findAllProducts);

app.get('/products/:id', findProductById);

app.post('/products', createProduct);

app.put('/products/:id', updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
