const serviceProducts = require('../services/verificaProducts');

const createProduct = async (req, res) => {
const { name, quantity } = req.body;
const product = await serviceProducts.createProduct(name, quantity);
if (product.err) {
  return res.status(422).json(product);
}
return res.status(201).json(product);
};

const getAllProducts = async (_req, res) => {
  const products = await serviceProducts.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getProductById(id);
  if (product.err) {
    return res.status(422).json(product);
  }
  return res.status(200).json(product);
};

module.exports = { createProduct, getAllProducts, getProductById };
