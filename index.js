const express = require('express');
const bodyParser = require('body-parser');

const { 
  createProd, 
  getAllProds, 
  findByIdProds, 
  updateProd, 
  deleteProd,
} = require('./controllers/productsController');

const { 
  createSale, 
  getAllSales, 
  findByIdSale, 
  updateSale,
  deleteSale,
} = require('./controllers/salesController');

const { validateProducts, isValidId } = require('./middlewares/productsMiddleware');
const { 
  verifyQuantity, 
  existsSale, 
  isCorrectId, 
  assuranceStock,
} = require('./middlewares/salesMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

app.get('/products', getAllProds);
app.get('/products/:id', isValidId, findByIdProds);
app.post('/products', validateProducts, createProd);
app.put('/products/:id', isValidId, validateProducts, updateProd);
app.delete('/products/:id', isValidId, deleteProd);

app.get('/sales', getAllSales);
app.get('/sales/:id', existsSale, findByIdSale);
app.post('/sales', verifyQuantity, assuranceStock, createSale);
app.put('/sales/:id', verifyQuantity, updateSale);
app.delete('/sales/:id', isCorrectId, deleteSale);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}...`);
});
