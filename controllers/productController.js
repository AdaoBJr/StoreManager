const serviceProducts = require('../services/verificaProducts');

const createProduct = async (req, res) => {
const { name, quantity } = req.body;
const product = await serviceProducts.createProduct(name, quantity);
if (product.err) {
  return res.status(422).json(product);
}
return res.status(201).json(product);
};

module.exports = createProduct;
