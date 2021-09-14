const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controllers/Product');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/products', Product.getAll);
app.get('/products/:id', Product.findById);
app.post('/products', Product.create);
app.put('/products/:id', Product.update);
app.delete('/products/:id', Product.remove);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});
