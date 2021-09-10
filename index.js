const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const errorMiddleware = require('./controllers/errorController');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.put('/products', ProductsController.create);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
