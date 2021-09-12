const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const errorMiddleware = require('./middlewares/error');

// declarações
const app = express();
const PORT = 3000;

// configs
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rotas
app.post('/products', productsController.create);
app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);
app.put('/products/:id', productsController.updateById);

// error
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Servido rodando na porta: ${PORT}`));