const Product = require('../models/productModel');

module.exports = async (req, _res, next) => {
  const sale = req.body;
  const ZERO = 0;
  const error = {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
    statusCode: 404,
  };

  const allProducts = await Product.getAllProducts();

  for (let index = ZERO; index < sale.length; index += 1) {
    const item = sale[index];
    const product = allProducts.find(({ _id }) => (
      JSON.stringify(_id) === JSON.stringify(item.productId)));
    if (!product) { return next(error); }
    if (product.quantity < item.quantity) { return next(error); }
  }
  return next();
};
