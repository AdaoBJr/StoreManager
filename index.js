// Importação do Express
const express = require('express');
// Importação do bodyparser
const bodyParser = require('body-parser');

// Importação dos Controllers
const productsController = require('./controllers/productsController');
const errorMiddleware = require('./controllers/errorsController');
const salesController = require('./controllers/salesController');

// require de configurações de variáveis de ambiente
require('dotenv').config();

// Inicializa o app com o express
const app = express();
// Verifica se existe uma porta específica ou utiliza a padrão
const PORT = process.env.PORT || 3000;

// Utiliza o bosyparser
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 1
app.post('/products', productsController.create);
// Requisito 2
app.get('/products', productsController.getAll);
// Requisito 2
app.get('/products/:id', productsController.getById);
// Requisito 3
app.put('/products/:id', productsController.updateById);
// Requisito 4
app.delete('/products/:id', productsController.deleteById);
// Requisito 5
app.post('/sales', salesController.create);
// Requisito 6
app.get('/sales', salesController.getAll);
// Requisito 6
app.get('/sales/:id', salesController.getById);
// Requisito 7
app.put('/sales/:id', salesController.update);
// Requisito 8
app.delete('/sales/:id', salesController.deleteById);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
