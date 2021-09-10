const express = require('express');

const errorMiddleware = require('./middlewares/error');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

const LOCALHOST = 3000;
const port = process.env.PORT || LOCALHOST;

app.listen(port, () => { console.log(`Ouvindo na porta ${port}`); });
