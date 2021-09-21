const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.get('/', (_request, response) => { response.send(); });

app.listen(PORT, () => {
  console.log(`listening port ${PORT}...`);
});