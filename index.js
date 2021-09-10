require('dotenv').config();
require('module-alias/register');

const config = require('@config');
const app = require('@app');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(config.app.port, (err) => {
  if (err) {
    return console.log('erro');
  }
  console.log('iniciou em http://localhost:3000');
});