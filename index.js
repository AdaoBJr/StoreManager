const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./1routes/products');
const salesRoutes = require('./1routes/sales');

const app = express();
const PORT = '3000';

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
