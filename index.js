const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', route);

app.listen(PORT, () => console.log(`Running in the the door ${PORT}`));