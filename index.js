const express = require('express');
const { productRouter } = require('./controllers/productController');
const { saleRouter } = require('./controllers/saleController');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', saleRouter);

app.listen(PORT, () => 
  console.log(`Server listening on port ${PORT}`));