const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();

const productsController = require('./controllers/products');
const salesController = require('./controllers/sales');

const app = express();
app.use(bodyParser);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', rescue(productsController.findById));
app.get('/products', rescue(productsController.fetchProducts));
app.get('/sales', rescue(salesController.fetchSales));
app.get('/sales/:id', rescue(salesController.findById));

app.post('/products', rescue(productsController.createProduct));
app.post('/sales', rescue(salesController.newSale));

app.put('/products/:id', rescue(productsController.updateProduct));
app.put('/sales/:id', rescue(salesController.updateSale));

app.delete('/products/:id', rescue(productsController.deleteProduct));
app.delete('/sales/:id', rescue(salesController.deleteSale));

app.use((err, _req, res, _next) => {
  if (err.err) {
    const { status, err: { code, message } } = err;
    return res.status(status).json({ err: { code, message } });
  } return res.status(500).json(err);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
