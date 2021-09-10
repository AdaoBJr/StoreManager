const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const { PORT } = process.env || 3000;

const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.listen(PORT, () => { console.log(`Aplicação ouvindo na porta ${PORT}`); });
