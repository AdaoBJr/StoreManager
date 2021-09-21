const express = require('express');
const bodyParser = require('body-parser');

const { 
  createProduct,
  getAllProducts,
  findByIDProducts,
  updateProduct,
  deleteOneProduct,
} = require('./controllers/products');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

const { validateProducts, validateID } = require('./middlewares/middlewareProducts');

app.get('/products', getAllProducts);
app.get('/products/:id', validateID, findByIDProducts);
app.post('/products', validateProducts, createProduct);
app.put('/products/:id', validateID, validateProducts, updateProduct);
app.delete('/products/:id', validateID, deleteOneProduct);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}...`);
});