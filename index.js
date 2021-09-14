const express = require('express');
const bodyParser = require('body-parser');
const productsControler = require('./controller/productsController');
const salesController = require('./controller/salesController');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/products/:id', productsControler.getProductById);

app.put('/products/:id', productsControler.updateProduct);

app.delete('/products/:id', productsControler.deleteProduct);

app.get('/products', productsControler.getAllProducts);

app.get('/sales', salesController.getAllSales);

app.post('/products', productsControler.createProduct);

app.post('/sales', salesController.createSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, console.log(`Api na porta ${PORT}`));