const express = require('express');
const bodyParser = require('body-parser');

const { getAllProd, getProdId, createProd } = require('./controllers/productsController');
const { nameExist, nameLength, productQuantity } = require('./middlewares/productsMiddleware');
const { updateProd, deleteProd } = require('./controllers/productsController');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.post('/products', nameExist, nameLength, productQuantity,  createProd);
app.put('/products/:id', nameLength, productQuantity, updateProd);
app.get('/products/:id', getProdId);
app.get('/products', getAllProd);
app.delete('/products/:id', deleteProd);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo na porta ${PORT}`) });
