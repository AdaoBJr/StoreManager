const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint abaixo, ele está ai para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
