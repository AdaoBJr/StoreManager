const express = require('express');
const bodyParser = require('body-parser');
const { productRouter } = require('./controllers/ProductsController');
const { salesRouter } = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ------------------------------------------------------------------
// Requisito 1, 2, 3, 4: Rota de Produtos

// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/router-middleware/457000ee-68cb-4489-a75c-9ec061aca1a2?use_case=side_bar
app.use('/products', productRouter);

// ------------------------------------------------------------------
// Requisito 5: Rota de Vendas

app.use('/sales', salesRouter);

// ------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
