const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoutes);
app.use(salesRoutes);

app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});
