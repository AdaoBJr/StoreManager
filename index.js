const express = require('express');

const productsRouter = require('./src/routers/productsRouter');

const { errorMiddleware } = require('./middlewares');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint abaixo, ele está ai para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
