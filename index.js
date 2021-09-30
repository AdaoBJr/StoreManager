const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const StoreController = require('./controllers/storeController');
// const SalesController = require('./controllers/salesController');
// const ErrorMiddleware = require('./middlewares/error.js');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', StoreController.create);
// app.get('/products/:id', StoreController.getByIdOrName);
// app.get('/products', StoreController.getAll);
// app.put('/products/:id', StoreController.updateById);
// app.delete('/products/:id', StoreController.deleteById);
// app.post('/sales', SalesController.create);
// app.get('/sales/:id', SalesController.getById);
// app.get('/sales', SalesController.getAll);
// app.put('/sales/:id', SalesController.updateById);
// app.delete('/sales/:id', SalesController.deleteById);

// app.use(ErrorMiddleware);

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
