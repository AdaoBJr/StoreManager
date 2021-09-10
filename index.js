const express = require('express');
const bodyParser = require('body-parser');
const { validName, validQuantity, create, getAll } = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', () => {});

app.post('/products', validName, validQuantity, create);

app.listen(PORT, 
  () => { console.log(`Online na porta ${PORT}`); });
