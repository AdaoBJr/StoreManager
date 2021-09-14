const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const { productExists,
  validateName,
  validateQuantity,
} = require('./middlewares/productMiddle');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);

app.post('/products', productExists,
validateName,
validateQuantity, productController.create);

app.put('/products/:id',
validateName,
validateQuantity, productController.update);

app.delete('/products/:id', productExists, productController.deleteProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
