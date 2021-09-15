const service = require('../services/ProductsServices');

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const products = await service.createProducts(name, quantity);

  if (products.err) {
    return res.status(422).json({ err: products.err });
  }

  return res.status(201).json(products);
};

module.exports = {
 createProducts,
};