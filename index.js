// Iniciando o project store manager 
// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});
