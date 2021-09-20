const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./products/productRoutes');
const salesRouter = require('./sales/salesRoutes');

const app = express();
const PORT = '3000';

app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
