const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('ping');
});

app.use(productRoutes);

app.listen(3000);
