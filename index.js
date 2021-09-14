const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.post('/products', productsController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo na porta ${PORT}`); });
