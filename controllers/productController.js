const services = require('../services/productService');

async function saveProduct(req, res) {
  const product = req.body;
  const item = await services.saveProduct(product);
  if (item.err) {
    return res.status(422).json(item);
  }
  return res.status(201).json(item);
}

module.exports = { 
  saveProduct,
};