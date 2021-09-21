const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const errorMiddleware = require('./controllers/errorsController');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.get('/products', ProductsController.getAll);

app.get('/products/:id', ProductsController.getById);

app.put('/products/:id', ProductsController.updateById);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
