const express = require('express');
const bodyParser = require('body-parser');
const { productsRouter } = require('./routers');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use('/products', productsRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status).json({ err: error.err });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Rodando na porta:', PORT);
});
