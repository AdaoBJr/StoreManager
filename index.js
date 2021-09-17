const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const Products = require('./controllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/procudts', (req, res) => {

});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));