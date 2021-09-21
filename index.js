const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', productController.createProduct); // req 1

app.get('/products', productController.findAllProducts); // req 2

app.get('/products/:id', productController.findProductById); // req 2

app.put('/products/:id', productController.updateProduct); // req 3

app.delete('/products/:id', productController.delProduct); // req 4

app.post('/sales', saleController.registerSale); // req 5

app.get('/sales', saleController.findAllSales); // req 6

app.get('/sales/:id', saleController.findSaleById); // req 6

app.put('/sales/:id', saleController.updateSale); // req 7

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
