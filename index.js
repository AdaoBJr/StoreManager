const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

const LOCAL_PORT = 3000;
const PORT = process.env.PORT || LOCAL_PORT;

app.use(bodyParser.json());

app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Aplicação ouvindo na porta ${PORT}`);
});
