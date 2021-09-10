const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductController.create);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
}); 
