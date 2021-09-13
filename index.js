const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// READ
app.get('/products', productController.getAllProducts);

// READ ID
app.get('/products/:id', productController.getIdProduct);

// ADD
app.post('/products', productController.createProduct);

// UPDATE
app.put('/products/:id', productController.updateProduct);

// DELETE
app.delete('/products/:id', productController.deleteProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('Api rodando na porta 3000'); });