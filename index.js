const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales.js');

const app = express();
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(3000, () => console.log(PORT));
