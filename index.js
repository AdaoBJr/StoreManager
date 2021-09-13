const express = require('express');
const bodyParser = require('body-parser');
const productsControler = require('./controller/productsController');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/products/:id', productsControler.getProductById);

app.put('/products/:id', productsControler.updateProduct);

app.delete('/products/:id', productsControler.deleteProduct);

app.get('/products', productsControler.getAllProducts);

app.post('/products', productsControler.createProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, console.log(`Api na porta ${PORT}`));