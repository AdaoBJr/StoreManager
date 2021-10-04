// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Start');
});
