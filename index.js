const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const PORT = process.env.PORT || '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', (_request, response) => {
  response.status(201).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
