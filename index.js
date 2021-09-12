const express = require('express');
const bodyParser = require('body-parser');
const rota66 = require('./1routes/rota66');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(rota66);

app.listen(port, () => console.log('Example app listening on port port!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Ola sumido!!');
});
