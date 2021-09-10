const express = require('express');
const productsController = require('./controllers/productsController');

const app = express();
const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.create);
app.listen(PORT, () => console.log(`Servido rodando na porta: ${PORT}`));