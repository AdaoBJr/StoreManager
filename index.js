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

app.get('/products/:id', produtoController.buscarProdutoPorIDController);

app.get('/products', produtoController.buscarTodosProdutoController);

app.put('/products/:id', produtoController.atualizarProdutoController);

app.delete('/products/:id', produtoController.deleteProdutoController);

app.post('/sales', produtoController.cadastrarVendaController);

app.get('/sales/:id', produtoController.buscarVendaIDController);

app.get('/sales', produtoController.buscarTodasVendaController);

app.use(erroMiddleware);

app.listen(3000, () => { console.log('Api rodando na porta 3000'); });