const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/products');
const sales = require('./routes/sales');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rota dos produtos
app.use('/products', route);

// rota das Vendas
app.use('/sales', sales);

app.listen(PORT, () => console.log(`Running in the the door ${PORT}`));