const express = require('express');
// require('dotenv').config();
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);
app.post('/sales', Sales.createSale);

app.get('/products', Products.getAll);
app.get('/products/:id', Products.findById);
app.get('/sales', Sales.getAllSales);
app.get('/sales/:id', Sales.findSaleById);

app.put('/products/:id', Products.update);
app.put('/sales/:id', Sales.updateSale);

app.delete('/products/:id', Products.deleteProduct);

// const { PORT } = process.env;
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));