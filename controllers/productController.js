const ProductService = require('../services/productService');

async function save(req, res) {
  const product = req.body;
  const item = await ProductService.save(product);
  if (item.err) return res.status(422).json(item);
  return res.status(201).json(item);
}

async function list(_req, res) {
  const all = await ProductService.list();
  return res.status(200).json(all);
}

async function listById(req, res) {
  const { id } = req.params;
  const item = await ProductService.listById(id);
  
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

async function edit(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = await ProductService.edit(id, { name, quantity });
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

async function remove(req, res) {
  const { id } = req.params;
  const item = await ProductService.remove(id);
  if (item.err) return res.status(422).json(item);
  return res.status(200).json(item);
}

module.exports = { 
  save,
  list,
  listById,
  edit,
  remove,
};