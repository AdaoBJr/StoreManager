const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

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
app.get('/products', productsController.create);

app.listen(PORT, () => console.log(`Servido rodando na porta: ${PORT}`));