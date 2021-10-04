const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const errorMiddleware = require('./controllers/errorsController');
const salesController = require('./controllers/salesController');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.create);

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.put('/products/:id', productsController.updateById);

app.delete('/products/:id', productsController.deleteById);

app.post('/sales', salesController.create);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
