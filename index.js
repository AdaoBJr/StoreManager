const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/productsControllers');
const SaleController = require('./controllers/salesControllers');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;
// PRODUCTS
app.get('/products/:id', ProductController.getProductById);
app.put('/products/:id', ProductController.updateProductById);
app.delete('/products/:id', ProductController.deleteProductById);
app.get('/products', ProductController.getAllProducts);
app.post('/products', ProductController.createProduct);

// SALES
app.get('/sales/:id', SaleController.getSaleById);
app.put('/sales/:id', SaleController.updateSaleId);
app.delete('/sales/:id', SaleController.deleteSaleId);
app.post('/sales', SaleController.createSale);
app.get('/sales', SaleController.getSales);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(` Rodando na porta ${PORT}`));
