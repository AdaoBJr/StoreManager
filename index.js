const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsControllers.create);

app.get('/products/:id', productsControllers.getById);
app.get('/products', productsControllers.getAll);

app.put('/products/:id', productsControllers.updateById);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
