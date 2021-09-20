const ProductService = require('../services/productService');

async function saveProduct(req, res) {
  const product = req.body;
  const item = await ProductService.saveProduct(product);
  if (item.err) return res.status(422).json(item);
  return res.status(201).json(item);
}

async function listProducts(_req, res) {
  const list = await ProductService.listProducts();
  return res.status(200).json(list);
}

async function listProductById(req, res) {
  const { id } = req.params;
  const item = await ProductService.listProductById(id);
  
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

async function editProduct(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = await ProductService.editProduct(id, { name, quantity });
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

async function removeProduct(req, res) {
  const { id } = req.params;
  const item = await ProductService.removeProduct(id);
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

module.exports = { 
  saveProduct,
  listProducts,
  listProductById,
  editProduct,
  removeProduct,
};