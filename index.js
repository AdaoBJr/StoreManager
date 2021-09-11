const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.addProduct);
app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.findProductById);
app.put('/products/:id', productsController.updateProduct);
app.delete('/products/:id', productsController.removeProduct);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
