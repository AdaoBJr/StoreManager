const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const errorMiddleware = require('./middlewares/error');
const salesController = require('./controllers/salesControllers');

// declarações
const app = express();
const PORT = 3000;

// configs
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rotas
app.route('/products')
  .post(productsController.create)
  .get(productsController.findAll);
app.route('/products/:id')
  .get(productsController.findById)
  .put(productsController.updateById)
  .delete(productsController.remove);

app.route('/sales')
  .post(salesController.create)
  .get(salesController.findAll);
// error
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Servido rodando na porta: ${PORT}`));