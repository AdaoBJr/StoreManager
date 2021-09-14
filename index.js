const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => 
  console.log(`Server listening on port ${PORT}`));