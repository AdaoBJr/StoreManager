const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');
const SaleController = require('./controllers/SaleController');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/products', ProductController.createProduct);
app.get('/products/:id', ProductController.findProductById);
app.get('/products', ProductController.getAllProducts);
app.put('/products/:id', ProductController.updateProduct);
app.delete('/products/:id', ProductController.deleteProduct);

app.get('/sales', SaleController.getAllSales);
app.get('/sales/:id', SaleController.getSaleById);
app.post('/sales', SaleController.createSale);
app.put('/sales/:id', SaleController.updateSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
