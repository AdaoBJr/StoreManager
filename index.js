const bodyParser = require('body-parser');
const express = require('express');
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

const app = express();

/* 
  Parte desse projeto me baseei na estrutura de código
  dos colegas Kevin Fraga e Lucas Martins.
  
  https://github.com/tryber/sd-09-store-manager/tree/kevinfraga-sd-09-store-manager

  https://github.com/tryber/sd-010-b-store-manager/tree/lucas-martins-da-silva-store-manager

*/

app.use(bodyParser.json());
app.use('/products', productRoute);
app.use('/sales', saleRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// ----------------------------------------------------

const PORT = 3000;
app.listen(PORT, () => console.log('Rodando na porta 3000'));