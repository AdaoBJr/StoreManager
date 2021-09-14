// não remova esse endpoint, e para o avaliador funcionar
const PORT = 3000;
const express = require('express');

const bodyParser = require('body-parser');
// const { json } = require('body-parser');

const app = express();
app.use(bodyParser.json());
const productsController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const { 
  isValidProductName,
  isValidQuantity,
  qauntityIsNumber,
  ifNameExists,
  ifProductIdNotExists,
  
} = require('./services/productServices');

const { salesWithAllProductValid, ifSaleIdNotExists } = require('./services/salesServices');

app.get('/', (_request, response) => {
  response.send(); 
});
// Rotas do Product
app.post('/products', 
isValidProductName,
isValidQuantity,
qauntityIsNumber,
ifNameExists, productsController.createNewProduct);

app.get('/products', 
productsController.getAll);

app.get('/products/:id', ifProductIdNotExists,
productsController.getById);

app.put('/products/:id', 
ifProductIdNotExists,
isValidProductName,
isValidQuantity,
qauntityIsNumber,
productsController.updateByIdController);

app.delete('/products/:id', 
ifProductIdNotExists,
productsController.deleteByidController);

// Rotas do Sales

app.post('/sales', 
salesWithAllProductValid,
salesController.createNewSale);

app.get('/sales', 
salesController.getAll);

app.get('/sales/:id', ifSaleIdNotExists, 
salesController.getById);

app.put('/sales/:id',
salesWithAllProductValid,
ifSaleIdNotExists,
salesController.updateById);
// app.get('/products/:id', ifProductIdNotExists,
// productsController.getById);
app.use((err, req, res, _next) => 
res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

app.listen(PORT, () => {
   console.log('Rodando na porta 3000');
  });
