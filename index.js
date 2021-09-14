const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('./Controllers/produtoController');
const erroMiddleware = require('./ErroMiddleware/erroMiddleware');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', produtoController.cadastrarProdutoController);

app.use(erroMiddleware);

app.listen(3000, () => { console.log('Api rodando na porta 3000'); });