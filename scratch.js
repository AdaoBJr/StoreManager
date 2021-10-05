const productService = require('./services/products');
const productsModel = require('./models/products');
const salesService = require('./services/sales');

((async () => {
  await productsModel.deleteAllProductsFromDB();

  let someProduct = await productService.addNewProduct({ name: 'abcde', quantity: 6 });
  const id = someProduct.insertedId;

  salesService.updateProductQuantity(id, 55);
  someProduct = await productService.getProductById(id);
  console.log(someProduct);

})());
