require('dotenv').config();

const express = require('express');

const ErrorHandler = require('./middlewares/Errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./routes/ProductsRoutes'));

app.use(ErrorHandler);

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Aplicação ao rodar na porta ${PORT}`));