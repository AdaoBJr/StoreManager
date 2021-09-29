const productService = require('./services/products');
const salesService = require('./services/sales');

(function () {
  const someProduct = await productService.addNewProduct({ name: '', quantity: 6 });
  console.log(someProduct);
})();
