const express = require('express');
const routesProducts = require('./routes/productRoute');
const routesSales = require('./routes/salesRoute');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routesProducts);
app.use(routesSales);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
