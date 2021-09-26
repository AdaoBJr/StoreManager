require('dotenv').config();

const express = require('express');
const cors = require('cors');

const ErrorHandler = require('./middlewares/Errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', require('./controllers/ProductsController'));

app.use(ErrorHandler);

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Aplicação ao rodar na porta ${PORT}`));