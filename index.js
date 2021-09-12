const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const middleware = require('./middleware/middlewareErros');

app.use(express.json());
app.use(bodyParser.json());
const { product } = require('./routes/productsRouter');

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(middleware);
app.use('/products', product);

app.listen(port, () => console.log('Its working'));
