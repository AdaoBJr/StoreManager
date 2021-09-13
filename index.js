const express = require('express');

const app = express();
app.use(express.json());
const router = require('./routes/router');

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log('listening on port', PORT));