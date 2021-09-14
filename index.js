const express = require('express');
const Products = require('./controllers/Products');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/products', Products.getAllProducts);

app.get('/products/:id', Products.validateProductId, Products.findProductById);

app.post('/products', Products.validateProduct, Products.createProduct);

app.put('/products/:id', Products.validateProduct, Products.updateProduct);

app.delete('/products/:id', Products.validateProductId, Products.deleteProduct);