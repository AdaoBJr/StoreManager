const express = require('express');

const { productRoute } = require('./Routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use('/products', productRoute);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const LOCALHOST = 3000;
const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`); });
