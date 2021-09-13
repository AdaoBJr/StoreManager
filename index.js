const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

app.use(bodyParser.json());

app.get('/products/:id', productController.getProductsById);

app.get('/products', productController.getProducts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createProduct);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.excludeProduct);

app.get('/sales/:id', saleController.getSalesById);

app.get('/sales', saleController.getSales);

app.post('/sales', saleController.createSale);

app.put('/sales/:id', saleController.updateSale);

app.delete('/sales/:id', saleController.excludeSale);

app.listen(port, () => console.log(`Listening on port ${port}!`));
