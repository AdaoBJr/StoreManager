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
app.post('/products', productExists,
validateName,
validateQuantity, productController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
