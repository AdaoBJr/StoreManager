const ServiceProduct = require('../service/serviceProducts');

const getAll = async (_req, res) => {
  const products = await ServiceProduct.getAll();
  return res.status(200).json(products);
};

const create = async (req, res) => {  
  const { name, quantity } = req.body;
  
  const product = await ServiceProduct.create({ name, quantity });

  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product.ops[0]);
};

module.exports = { create, getAll };
