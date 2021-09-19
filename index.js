const express = require('express');

const app = express();
app.use(express.json());
const PORT = 3000,

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('erro');
  }
  console.log(`iniciou em http://localhost:${PORT}`);
});