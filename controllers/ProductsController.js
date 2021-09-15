const service = require('../services/ProductsServices');

const getAllProducts = async (_req, res) => {
  const allProducts = await service.getAllProducts();
  res.status(200).json({ products: allProducts });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productId = await service.findById(id);
  if (productId.err) {
    return res.status(422).json({ err: productId.err });
  }
  return res.status(200).json(productId);
};

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
 getAllProducts,
 findById,
};