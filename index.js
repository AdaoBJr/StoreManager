const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productsControllers');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get('/products/:id', ProductController.getProductById);

app.get('/products', ProductController.getAllProducts);

app.post('/products', ProductController.createProduct);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(` Rodando na porta ${PORT}`));
