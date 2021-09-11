require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(bodyParser.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`App Online on Port:${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
