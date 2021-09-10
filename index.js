const express = require('express');
const routes = require('./Routes');
const { errorMiddleware } = require('./middlewares');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Connection PORT: ${port}`));