const express = require('express');
const products = require('./routes/products');
const sales = require('./routes/sales');

const app = express();

app.use(express.json());
app.use('/products', products);
app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Estou na porta 3000'));
