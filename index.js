const express = require('express');
const bodyParser = require('body-parser');
const { create, getAll, getById } = require('./controllers/productsController');

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

app.get('/products/:id', getById);

app.route('/products')
  .post(create)
  .get(getAll);