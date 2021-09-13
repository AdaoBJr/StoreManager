// não remova esse endpoint, e para o avaliador funcionar
const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const productsController = require('./controllers/productController');

const { 
  isValidProductName,
  isValidQuantity,
  qauntityIsNumber,
  ifNameExists,
  
} = require('./services/productServices');

app.get('/', (_request, response) => {
  response.send(); 
});

app.post('/products', 
isValidProductName,
isValidQuantity,
qauntityIsNumber,
ifNameExists, productsController.createNewProduct);

app.listen(PORT, () => {
   console.log('Rodando na porta 3000');
  });
