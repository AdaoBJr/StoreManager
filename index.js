const express = require('express');
const bodyParser = require('body-parser');
const { validShortName,
  validExistName,
  validQuantity,
  create,
  getAll,
  getById,
  update,
  remove } = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, 
  () => { console.log(`Online na porta ${PORT}`); });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

app.post('/products', validShortName, validExistName, validQuantity, create);

app.put('/products/:id', validShortName, validQuantity, update);

app.delete('/products/:id', remove);
