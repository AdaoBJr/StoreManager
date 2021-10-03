const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const LOCAL_PORT = 3000;
const PORT = process.env.PORT || LOCAL_PORT;

function listeningPort() {
  return console.log(`Aplicação ouvindo a porta ${PORT}!`)
};

app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, listeningPort);
