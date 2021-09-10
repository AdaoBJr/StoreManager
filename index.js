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

app.post('/products', ProductsController.create);

app.get('/products', ProductsController.getAll);

app.get('/products/:id', ProductsController.getById);

app.put('/products/:id', ProductsController.updateById);

app.delete('/products/:id', ProductsController.deleteById);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
