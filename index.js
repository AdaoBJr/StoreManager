const express = require('express');
const { productsRoute, salesRoute } = require('./routes');

const app = express();
app.use(express.json());

const PORT = '3000';

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.listen(PORT, () => {
  console.log(`Online in port ${PORT}!!`);
});
