const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// const route = require('./Routes');
// const error = require('./middlewares/error');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// route.product(app);
// route.sales(app);

// app.use(error);

//-----
const Product = require('./controllers/Product');
// const Sale = require('./controllers/Sale');
const error = require('./middlewares/error');

app.post('/products', Product.createProduct);

app.use(error);

// app.route('/products')
//     .get(rescue(controller.getAll))
//     .post(rescue(controller.createProduct));

//   app.route('/products/:id')
//     .get(rescue(controller.getById))
//     .put(rescue(controller.updateProduct))
//     .delete(rescue(controller.deleteProduct));
//-----

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// const express = require('express');
// const bodyParser = require('body-parser');
// const Product = require('./controllers/Product');
// const Sale = require('./controllers/Sale');
// const erro = require('./middlewares/error');
require('dotenv').config();

// const PORT_NUMBER = 3000;
// const PORT = process.env.PORT || PORT_NUMBER;
// const app = express();
// app.use(bodyParser.json());

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.send();
// });

// app.post('/products', Product.create);
// app.get('/products', Product.getAll);
// app.get('/products/:id', Product.getOne);
// app.put('/products/:id', Product.edit);
// app.delete('/products/:id', Product.deleteOne);

// app.post('/sales', Sale.create);
// app.get('/sales', Sale.getAll);
// app.get('/sales/:id', Sale.getOne);
// app.put('/sales/:id', Sale.edit);
// app.delete('/sales/:id', Sale.deleteOne);

// app.use(erro);

// app.listen(PORT, () => { 
//   console.log(`Listening on port ${PORT}`); 
// });
