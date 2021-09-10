const express = require('express');

const app = express();
const products = require('./routes/products.routes');
const sales = require('./routes/sales.routes');

app.use(express.json());
const port = 3000;
app.use(products);
app.use(sales);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, console.log('App funcionando na porta 3000'));
