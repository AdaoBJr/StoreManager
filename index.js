const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');
const SalesController = require('./controllers/SalesController');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.put('/products/:id', ProductController.update);
app.get('/products/:id', ProductController.findById);
app.delete('/products/:id', ProductController.deleteById);
app.get('/sales/:id', SalesController.findById);

app.get('/products', ProductController.getAll);
app.post('/products', ProductController.create);
app.get('/sales', SalesController.getAll);
app.post('/sales', SalesController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
