const express = require('express');
// require('dotenv').config();
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);

app.get('/products/:id', Products.findById);
app.get('/products', Products.getAll);

// const { PORT } = process.env;
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));