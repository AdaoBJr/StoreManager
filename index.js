const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
.get(productController.getOneProduct)
.put(productController.updateProduct);

app.route('/products')
.post(productController.createNewProduct)
.get(productController.getAllProducts);

app.listen(PORT, () => {
  console.log('Online');
});
