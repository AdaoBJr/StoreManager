const express = require('express');
const bodyParser = require('body-parser');

const Products = require('./controllers/Products');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint ⇣, ele faz o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAllProducts);
app.get('/products/:id', Products.getProductById);

app.post('/products', Products.registerNewProduct);

app.put('/products/:id', Products.updateProduct);

app.use(errorMiddleware);

const port = 3000;

app.listen(port, () => console.log(`Online on port ${port}!`));
