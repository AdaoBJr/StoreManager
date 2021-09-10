require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const { PORT } = process.env;

app.listen(PORT, () => console.log(`App Online on Port:${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
