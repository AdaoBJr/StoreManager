const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`); });
