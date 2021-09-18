const productsServices = require('../services/productsService');
const productsErr = require('./err/productsErr');

async function getAll(_req, res) {
  const products = await productsServices.getAll();
  return res.status(200).json({ products });
}

async function getById(req, res) {
  const { id } = req.params;
  const product = await productsServices.getById({ id });

  if (product === 'wrong id') res.status(422).json(productsErr.errWrongId);

  return res.status(200).json(product);
}

async function create(req, res) {
  const { name, quantity } = req.body;
  const products = await productsServices.create({ name, quantity });
  
  if (products === '< then 5') res.status(422).json(productsErr.errNameLength);
  if (products === 'name exists') res.status(422).json(productsErr.errExists);
  if (products === 'quantity < 0') res.status(422).json(productsErr.errQuantityLength);
  if (products === 'quantity not a number') res.status(422).json(productsErr.errQuantityNotNumber);

  return res.status(201).json(products);
}

module.exports = {
  getAll,
  getById,
  create,
};