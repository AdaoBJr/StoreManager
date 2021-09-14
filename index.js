const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/ProductsRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRouter);
app.use(salesRoutes);

app.listen(3000, () => {
  console.log('Online');
});