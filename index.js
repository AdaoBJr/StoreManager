const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/error');
const ProductController = require('./controllers/ProductController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.get('/products', ProductController.findAll);

app.post('/products', ProductController.create);

app.get('/products/:id', ProductController.findById);

app.put('/products/:id', ProductController.update);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
