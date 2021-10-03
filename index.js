const express = require('express');

const app = express();

const PORT = process.env.PORT;

function listeningPort() {
  return console.log(`Aplicação ouvindo a porta ${PORT}!`)
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, listeningPort);
