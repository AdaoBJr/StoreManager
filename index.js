const express = require('express');

require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const routers = require('./routes/productsRouters');
const { errorMiddleProducts } = require('./middlewares/errorStatus');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
    response.send();
});

const PORT = 3000;

app.use(routers);
app.use(errorMiddleProducts);

app.listen(PORT, () =>
    console.log(`Servidor rodando na porta ${PORT}`));