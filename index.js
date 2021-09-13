const express = require('express');
const bodyParser = require('body-parser');
const { create, getAll, getById, update } = require('./controllers/productsController');

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
  .put(update);

app.route('/products')
  .post(create)
  .get(getAll);