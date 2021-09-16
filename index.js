const express = require('express');
const bodyParser = require('body-parser');
const productControllers = require('./controllers/productController');
const salesControllers = require('./controllers/salesController');
const { validateNameAndQuantity, validateSalesQuantities } = require('./middlewares/validate');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.post('/products', validateNameAndQuantity, productControllers.create);
app.get('/products', productControllers.getAll);
app.get('/products/:id', productControllers.getById);
app.put('/products/:id', validateNameAndQuantity, productControllers.update);
app.delete('/products/:id', productControllers.exclude);

app.post('/sales', validateSalesQuantities, salesControllers.create);
app.get('/sales', salesControllers.getAll);
app.get('/sales/:id', salesControllers.getById);
app.put('/sales/:id', validateSalesQuantities, salesControllers.update);

app.listen(PORT, () => console.log(`Online ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
