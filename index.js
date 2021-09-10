const express = require('express');
const routesProducts = require('./routes/product.routes');
const salesProducts = require('./routes/sales.routes');

const app = express();
app.use(express.json());
app.use(routesProducts);
app.use(salesProducts);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});
