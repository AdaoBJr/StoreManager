const express = require('express');
require('dotenv').config();

const app = express();

const PORT = 3000;

function listeningPort() {
  return console.log(`Aplicação ouvindo a porta ${PORT}!`)
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, listeningPort);
