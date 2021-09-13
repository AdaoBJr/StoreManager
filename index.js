const express = require('express');
const bodyParser = require('body-parser');
const { create, getAll, getById, update, delProduct } = require('./controllers/productsController');
const { createSale, getAllSales, getByIdSale } = require('./controllers/salesController');

const app = express();

const PORT = '3000';
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.route('/products/:id')
  .get(getById)
  .put(update)
  .delete(delProduct);

app.route('/products')
  .post(create)
  .get(getAll);

app.route('/sales/:id')
  .get(getByIdSale);

app.route('/sales')
  .post(createSale)
  .get(getAllSales);