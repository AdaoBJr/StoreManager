const express = require('express');
const bodyParser = require('body-parser');
const routesProduct = require('./routes/products_route');
const routesSales = require('./routes/sales_route');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routesProduct);
app.use(routesSales);

app.listen(3000, () => {
  console.log('Online. Porta 3000'); 
});