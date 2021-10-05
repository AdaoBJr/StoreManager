const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
app.use(bodyParser.json());

app.use(router);

app.get('/', (_request, response) => {
  response.send();
});

const LOCALHOST = 3000;
app.listen(LOCALHOST, () => {
  console.log(`Ouvindo a porta ${LOCALHOST}`);
})