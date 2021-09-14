const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsRouter = require('./controllers/productsController');
// const salesRouter = require('./controllers/salesController');

const PORT = '3000';

app.use('/products', productsRouter);
// app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Now live running at PORT 3000');
});
