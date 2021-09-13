// não remova esse endpoint, e para o avaliador funcionar
const PORT = 3000;
const express = require('express');

const bodyParser = require('body-parser');
// const { json } = require('body-parser');

const app = express();
app.use(bodyParser.json());
const productsController = require('./controllers/productController');

const { 
  isValidProductName,
  isValidQuantity,
  qauntityIsNumber,
  ifNameExists,
  ifProductIdNotExists,
  
} = require('./services/productServices');

app.get('/', (_request, response) => {
  response.send(); 
});

app.post('/products', 
isValidProductName,
isValidQuantity,
qauntityIsNumber,
ifNameExists, productsController.createNewProduct);

app.get('/products', 
productsController.getAll);

app.get('/products/:id', ifProductIdNotExists,
productsController.getById);

app.use((err, req, res, next) => res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

app.listen(PORT, () => {
   console.log('Rodando na porta 3000');
  });
