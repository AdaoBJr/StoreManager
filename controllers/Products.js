const service = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await service.isValid(name, quantity);
  if (result) return res.status(result.status).json(result.message);
  
  const product = await service.create(name, quantity);
  return res.status(201).json(product);
};

module.exports = {
  create,
};