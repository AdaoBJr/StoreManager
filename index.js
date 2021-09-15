const express = require('express');
const bodyParser = require('body-parser');
const productConstrollers = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/products', productConstrollers.getAll);
app.get('/products/:id', productConstrollers.getById);

app.listen(PORT, () => console.log(`Online ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
