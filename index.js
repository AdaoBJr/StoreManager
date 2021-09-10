const express = require('express');

const app = express();

// Body Parser
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
