const express = require('express');
const bodyParser = require('body-parser');

const Author = require('./controllers/Author');
const Product = require('./controllers/Product');

const app = express();

app.use(bodyParser.json());

app.get('/authors', Author.getAll);
app.get('/products', Product.getAll);
app.get('/authors/:id', Author.findById);
app.get('/products/:id', Product.findById);
app.post('/authors', Author.create);
app.post('/products', Product.create);
app.put('/products/:id', Product.update);
app.delete('/products/:id', Product.remove);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});
