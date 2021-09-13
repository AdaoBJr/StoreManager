const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controller/controllerProducts');

const app = express();
app.use(bodyParser.json());

app.get('/products', Product.getAll);

app.post('/products', Product.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use((err, req, res, _next) => {
//   res.status(500).json({ error: `Erro: ${err.message}` });
// });

app.listen(3000, () => console.log('Aplicação ouvindo na porta 3000'));
