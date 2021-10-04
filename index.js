const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const route2Products = require('./Routes/ProductRoutes');
const route2Sales = require('./Routes/sales');
const error = require('./middlewares/error');

app.use(bodyParser.json());
app.get('/', (_request, response) => {
  response.send();
});

route2Products(app);
route2Sales(app);
app.use(error);

app.listen(3000, () => console.log('Listening...'));
