const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productControllers');
const saleController = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

app.route('/products/:id')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

app.route('/sales')
  .get(saleController.getAllSales)
  .post(saleController.createSale);

app.route('/sales/:id')
  .get(saleController.getSale)
  .put(saleController.updateSale)
  .delete(saleController.deleteSale);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });