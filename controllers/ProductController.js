const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const productCreated = await ProductService.create(name, quantity);

  if (productCreated.err) {
    return res.status(422).json({ err: productCreated.err });
  }
    
  res.status(201).json(productCreated);
};

module.exports = {
  createProduct,
};