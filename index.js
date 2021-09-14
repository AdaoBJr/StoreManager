const express = require('express');
const bodyParser = require('body-parser');
const { getAllProducts,createProduct,updateProduct,deleteProduct } = require('./controllers/productController');

const app = express();

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`O Pai tá ON na porta ${PORT}`);
});

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.get('/products',getAllProducts );
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);