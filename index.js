const express = require('express');
const { productsRoute } = require('./routes');

const app = express();
app.use(express.json());

const PORT = '3000';

// do not remove, is for the evaluator to work correctly
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);

app.listen(PORT, () => {
  console.log(`Online at port ${PORT}`);
});
