const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

/* ===Produtos=== */
app.post('/products', productsController.registerProducts);

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));
