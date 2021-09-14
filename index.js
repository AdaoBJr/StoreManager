const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');

const Products = require('./controllers/productController');
const Sales = require('./controllers/saleController');

const app = express();

app.use(bodyParser.json());

app.delete('/products/:id', Products.removeProduct);
app.put('/products/:id', Products.updateProduct);
app.post('/products', Products.create);
app.get('/products/:id', Products.findById);
app.get('/products', Products.getAll);

app.post('/sales', Sales.create);
app.get('/sales', Sales.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

app.use(errorMiddleware);
