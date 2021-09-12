const express = require('express');

const productsRouter = require('./src/routers/productsRouter');

const { validateNameLength, validateQuantityType, validateQuantityAmount, errorMiddleware,
} = require('./middlewares');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint abaixo, ele está ai para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products',
validateNameLength, validateQuantityType, validateQuantityAmount, productsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
