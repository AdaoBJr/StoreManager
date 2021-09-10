const express = require('express');
const bodyParser = require('body-parser');

const { create } = require('./controllers/productsController');
const { validateProducts } = require('./middlewares/productsMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

app.post('/products', validateProducts, create);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
