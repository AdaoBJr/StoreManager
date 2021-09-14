const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();

const productsController = require('./controllers/products');

const app = express();
app.use(bodyParser);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsController.fetchProducts));
app.get('/products', rescue(productsController.findById));

app.post('/products', rescue(productsController.createProduct));

app.use((err, _req, res, _next) => {
  if (err.err) {
    const { status, err: { code, message } } = err;
    return res.status(status).json({ err: { code, message } });
  }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
