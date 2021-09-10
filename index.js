const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = '3000';
app.use(bodyParser).json();

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
