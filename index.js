const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

//* Rotas/Controllers de products!
app.get('/products', productsController.getAllProducts);
app.post('/products', productsController.createProduct);
app.get('/products/:id', productsController.getProductById);
app.put('/products/:id', productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

//* Rotas/Controllers de sales!
app.get('/sales/', salesController.getAllSales);
app.post('/sales', salesController.createSales);
app.get('/sales/:id', salesController.getSalesById);
app.put('/sales/:id', salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

//* Middleware de erro genérico!
app.use((err, _req, res, _next) => {
  res.status(err.code).json({ err: err.err });
});

app.listen(PORT, () => { console.log(`Api rodando na porta ${PORT}.`); });
