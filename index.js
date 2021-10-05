const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const route = require('./Routes');
const error = require('./middlewares/error');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

route.product(app);
route.sales(app);

app.use(error);

//-----
// const Product = require('./controllers/Product');
// const Sale = require('./controllers/Sale');
// const error = require('./middlewares/error');

// app.post('/products', Product.createProduct);
// app.post('/products', (req, res) => {
//   const { name, quantity } = req.body;
//   Product.createProduct(name, quantity, res);
// });

// app.route('/products')
//     .get(rescue(controller.getAll))
//     .post(rescue(controller.createProduct));

//   app.route('/products/:id')
//     .get(rescue(controller.getById))
//     .put(rescue(controller.updateProduct))
//     .delete(rescue(controller.deleteProduct));
//-----

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// require('dotenv').config();
