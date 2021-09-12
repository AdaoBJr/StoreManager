const ProductsService = require('../services/productsService');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.createProduct(name, quantity);

    if (product.err) return next(product.err);
    return res.status(201).json(product);
};

module.exports = {
  createProduct,
};