const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productController');
const sales = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.post('/products', products.insertNewProduct);
app.get('/products', products.getAllProducts);
app.get('/products/:id', products.getProductById);
app.put('/products/:id', products.updateProductById);
app.delete('/products/:id', products.deleteProductById);
app.post('/sales', sales.insertNewSale);
app.get('/sales', sales.getAllSales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
