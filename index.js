const express = require('express');
const routes = require('./routes');
const { responseErrors } = require('./middlewares');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send(`<h1>Running at port ${port}</h1>`);
});

app.use(routes);
app.use(responseErrors);

app.listen(port, () => console.log(`PORT: ${port}
STATUS: Running`));
