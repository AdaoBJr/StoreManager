const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const middlewares = require('./middlewares/middlewares');
const { errorMiddleware,
  errorMiddleware2,
  errorMiddleware3 } = require('./middlewares/errorMiddleware');

const app = express();
const defaultPORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',
  middlewares.checkCreateProductInput,
  middlewares.checkRepeatedName,
  productsController.createProduct);

app.get('/products', productsController.getAll);

app.get('/products/:id',
  middlewares.checkId,
  productsController.getById);

app.put('/products/:id',
  middlewares.checkCreateProductInput,
  middlewares.checkId,
  productsController.updateProduct);

app.delete('/products/:id',
  middlewares.checkId,
  productsController.deleteProduct);

app.post('/sales',
  middlewares.checkSale,
  salesController.createSale);

app.get('/sales',
  salesController.getAllSales);

app.get('/sales/:id',
  middlewares.checkSaleId,
  salesController.getSaleById);

app.put('/sales/:id',
  middlewares.checkSale,
  salesController.updateSale);

app.delete('/sales/:id',
  middlewares.checkSaleIdFormat,
  salesController.deleteSale);

app.use(errorMiddleware, errorMiddleware2, errorMiddleware3);

const PORT = process.env.PORT || defaultPORT;
 
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
