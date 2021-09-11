const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/ProductController');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/products', ProductController.create);
app.get('/products/:id', ProductController.findById);
app.get('/products', ProductController.getAll);
// app.put('/products/:id', ProductController.update);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
