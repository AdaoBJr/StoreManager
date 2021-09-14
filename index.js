const express = require('express');
const bodyParser = require('body-parser');

const products = require('./routers/ProductsRouter');
const sales = require('./routers/SalesRouter');

require('dotenv').config();

const app = express();
const URL_PORT = 3000;
const PORT = process.env.PORT || URL_PORT;

app.use(bodyParser.json());

app.use('/products', products);

app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { status, code, message } = err;

  return res.status(status)
  .json({ err: { code, message } });
});

app.listen(PORT, () => console.log(`Oline porta ${PORT}`));