const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.create);
app.get('/products', productController.getAllProduct);
app.get('/products/:id', productController.getByIdProduct)
  .put('/products/:id', productController.updateById)
  .delete('/products/:id', productController.deleteId);

app.post('/sales', saleController.create);
app.get('/sales', saleController.getAll);
app.get('/sales/:id', saleController.getById);

app.use((err, _req, res, _next) => {
  if (err.code === 'invalid_data') {
    return res.status(422).json({ err });
  } if (err.code === 'not_found') {
    return res.status(404).json({ err });
  }
});

app.listen(3000, () => console.log('Online'));