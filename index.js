const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/endpoints');
const error = require('./Middleware/error');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

productRoutes(app);
app.use(error);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
