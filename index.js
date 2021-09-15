const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/ProductsController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = '3000';

app.post('/products', controller.createProducts);
app.get('/products', controller.getAllProducts);
app.get('/products/:id', controller.findById);
app.put('/products/:id', controller.updateProduct);
app.delete('/products/:id', controller.excludeProduct);

app.listen(PORT, () => {
  console.log(`Conectado a porta ${PORT}`);
});
