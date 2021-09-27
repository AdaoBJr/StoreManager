const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const error = require('./Middleware/error');
const post2Create = require('./Routes/endpoints');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

post2Create(app);
app.use(error);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
