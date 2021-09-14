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

app.get('/products/:id', rescue(productsController.findById));
app.get('/products', rescue(productsController.fetchProducts));

app.post('/products', rescue(productsController.createProduct));

app.put('/products/:id', rescue(productsController.updateProduct));

app.delete('/products/:id', rescue(productsController.deleteProduct));

app.use((err, _req, res, _next) => {
  if (err.err) {
    const { status, err: { code, message } } = err;
    return res.status(status).json({ err: { code, message } });
  } return res.status(500).json(err);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
