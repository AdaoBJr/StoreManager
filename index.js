const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const error = require('./middlewares/error');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

route.product(app);
route.sales(app);

app.use(error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Esse projeto foi entregue com ajuda de colegas para que não houvesse mudança de turma, houve explicação da matéria, consulta a repositorios de outras pessoas, principalmente do gabriel e cleber.
