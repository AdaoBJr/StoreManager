const express = require('express');
const bodyParser = require('body-parser');

const { 
  createProduct,
  getAllProducts,
  findByIDProducts,
  updateProduct,
  deleteOneProduct,
} = require('./controllers/products');

const { 
  createSale, 
  getAllSales, 
  findByIdSale, 
  updateSale,
  deleteSale,
} = require('./controllers/sales');

const { validateProducts, validateID } = require('./middlewares/middlewareProducts');

const { 
  verifyQuantity, 
  existsSale, 
  isCorrectId, 
  assuranceStock,
} = require('./middlewares/middlewareSales');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

app.get('/products', getAllProducts);
app.get('/products/:id', validateID, findByIDProducts);
app.post('/products', validateProducts, createProduct);
app.put('/products/:id', validateID, validateProducts, updateProduct);
app.delete('/products/:id', validateID, deleteOneProduct);

app.get('/sales', getAllSales);
app.get('/sales/:id', existsSale, findByIdSale);
app.post('/sales', verifyQuantity, assuranceStock, createSale);
app.put('/sales/:id', verifyQuantity, updateSale);
app.delete('/sales/:id', isCorrectId, deleteSale);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}...`);
});