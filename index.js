const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const productController = require('./controllers/productsController');
const saleController = require('./controllers/salesController');

const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', productController);
app.use('/sales', saleController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('App ouvindo a porta 3000!'));