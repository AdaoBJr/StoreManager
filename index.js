const express = require('express');
const bodyParser = require('body-parser');
const storeController = require('./controllers/storeControllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(storeController.getAllProducts)
  .post(storeController.createProduct);

app.route('/products/:id')
  .get(storeController.getProduct);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });