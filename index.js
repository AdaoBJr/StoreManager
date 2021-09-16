const express = require('express');
const bodyParser = require('body-parser');

const { getAllProd, getProdId, createProd } = require('./controllers/productsController');
const { nameExist, nameLength, productQuantity,
  validId } = require('./middlewares/productsMiddleware');
const { updateProd, deleteProd } = require('./controllers/productsController');
const { createSale, getAllSale, getSaleId,
  updateSale, deleteSale } = require('./controllers/salesController');
const { saleQuantity, saleInvalid, validIdSale, 
  isValidSale } = require('./middlewares/salesMiddleware');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());
// products
app.post('/products', nameExist, nameLength, productQuantity, createProd);
app.put('/products/:id', nameLength, productQuantity, updateProd);
app.get('/products/:id', validId, getProdId);
app.get('/products', getAllProd);
app.delete('/products/:id', deleteProd);
// sales
app.post('/sales', saleQuantity, createSale);
app.put('/sales/:id', saleInvalid, updateSale);
app.get('/sales/:id', isValidSale, getSaleId);
app.get('/sales', getAllSale);
app.delete('/sales/:id', validIdSale, deleteSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo na porta ${PORT}`); });
