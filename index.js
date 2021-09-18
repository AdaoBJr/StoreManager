const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./router/productsRouter');
const salesRouter = require('./router/salesRouter');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, console.log(`Api na porta ${PORT}`));
