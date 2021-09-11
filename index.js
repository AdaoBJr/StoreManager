const express = require('express');
const bodyParser = require('body-parser');

const { create, getAll, findById, update } = require('./controllers/productsController');
const { validateProducts, isValidId } = require('./middlewares/productsMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

app.get('/products', getAll);
app.get('/products/:id', isValidId, findById);

app.post('/products', validateProducts, create);

app.put('/products/:id', isValidId, validateProducts, update);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}...`);
});
