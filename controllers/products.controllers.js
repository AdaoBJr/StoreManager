const Product = require('../services/products.services');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, err, newProduct } = await Product.create({ name, quantity });
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newProduct);
};

module.exports = { create };
