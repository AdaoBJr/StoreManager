const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando !!!' }));
app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Api rodando na porta ${3000}`); });