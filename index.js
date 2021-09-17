const express = require('express');
const bodyParser = require('body-parser');
const { getAllProducts, createProduct, 
  updateProduct, deleteProduct, getProduct } = require('./controllers/productController');
  const { getAllSales, createSale, getSale } = require('./controllers/saleController');

const app = express();

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`O Pai tá ON na porta ${PORT}`);
});

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.get('/products', getAllProducts);
app.get('/products/:id', getProduct);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

app.get('/sales', getAllSales);
app.get('/sales/:id', getSale);
app.post('/sales', createSale);
// app.put('/sales/:id', updateSale);
// app.delete('/sales/:id', deleteSale);