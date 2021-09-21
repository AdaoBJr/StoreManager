const express = require('express');
const bodyParser = require('body-parser');

const product = require('./controllers/productController');
const sale = require('./controllers/saleController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.createProduct);
app.get('/products', product.getAll);
app.get('/products/:id', product.getById);
app.put('/products/:id', product.updateProduct);
app.delete('/products/:id', product.deleteProduct);

app.post('/sales', sale.createSale);
app.get('/sales', sale.getAll);
app.get('/sales/:id', sale.getById);
app.put('/sales/:id', sale.updateSale);
app.delete('/sales/:id', sale.deleteSale);

app.use(errorMiddleware);

const port = 3000;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`); });
