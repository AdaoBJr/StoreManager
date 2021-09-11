const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsControllers.create);
app.post('/sales', salesControllers.create);

app.get('/products/:id', productsControllers.getById);
app.get('/products', productsControllers.getAll);

app.get('/sales/:id', salesControllers.getById);
app.get('/sales', salesControllers.getAll);

app.put('/products/:id', productsControllers.updateById);
app.put('/sales/:id', salesControllers.updateById);

app.delete('/products/:id', productsControllers.deleteById);
// app.delete('/sales/:id', salesControllers.deleteById);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
