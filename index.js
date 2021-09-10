const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./api/routers/productsRouter');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => console.log(`servidor on na porta: ${3000}`));