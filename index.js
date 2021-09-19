const express = require('express');

const app = express();
const products = require('./routes/products');
const sales = require('./routes/sales');

app.use(express.json());
const PORT = 3000;

app.use(products);
app.use(sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('erro');
  }
  console.log(`Api rodando em http://localhost:${PORT}`);
});
