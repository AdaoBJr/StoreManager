const express = require('express');
const productsRoutes = require('./routes/ProductRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(productsRoutes);

app.listen(PORT, () => console.log('Rodando na porta 3000'));
