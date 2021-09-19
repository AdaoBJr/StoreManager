
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`App está funcionando na porta ${PORT}`);
});
