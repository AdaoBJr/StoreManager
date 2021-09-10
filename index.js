const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routers/productsRouter');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Online'));
