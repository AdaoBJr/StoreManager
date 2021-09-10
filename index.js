const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routers/productsRouter');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// rodas dos recursos aqui
app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT} | http://localhost/${PORT},`));