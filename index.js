const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisito 1

app.post('/products', ProductsController.postProducts); // Incluir middleware de validação antes da rota

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
