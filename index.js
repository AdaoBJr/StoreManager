const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App está funcionando na porta ${PORT}`);
});

app.post('/products', productController.registerNewProduct);

app.get('/products', productController.getProducts);

app.get('/products/:id', productController.getProductById);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.registerNewSale);

app.get('/sales', salesController.getSales);

app.get('/sales/:id', salesController.getSalesById);

app.put('/sales/:id', salesController.updateSale);

app.delete('/sales/:id', salesController.deleteSale);
