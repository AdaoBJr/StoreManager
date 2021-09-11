const express = require('express');

const bodyParser = require('body-parser');

const PORT = 3000;

const router = require('./router/Router');

const { errorMiddleProducts } = require('./middlewares/errorFinalProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorMiddleProducts);

app.listen(PORT, () => console.log('ouvindo a porta 3000'));
// teste servidor