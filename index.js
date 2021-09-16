const express = require('express');
const bodyParser = require('body-parser');

const { validateId, getAll } = require('./controllers/products');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/products', getAll);

if (process.env.CI === 'true') {
  console.log('Running in CI mode');
} else console.log('Running in local mode');

app.listen(process.env.PORT || 3000);
