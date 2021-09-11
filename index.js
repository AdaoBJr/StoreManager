const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

if (process.env.CI === 'true') {
  console.log('Running in CI mode');
}

app.listen(process.env.PORT || 3000);
