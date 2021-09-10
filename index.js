const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(port, (_req, _res) => console.log('Open'));
