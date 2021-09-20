const express = require('express');
const producsRoutes = require('./routes/ProductRoutes');

const app = express();

const PORT = 3000;

app.use(express.json);

app.use(producsRoutes);

app.listen(PORT, () => console.log('Rodando na porta 3000'));
