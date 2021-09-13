const express = require('express');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/productsRoute');

const app = express();

app.use(bodyParser.json());
app.use('/products', productsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});