const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const sales = require('./routes/sales');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rota dos produtos
app.use('/products', products);

// rota das Vendas
app.use('/sales', sales);

app.use(({ status, err }, _req, res, _next) => {
  res.status(status).json({ err });
});

app.listen(PORT, () => console.log(`Running in the the door ${PORT}`));