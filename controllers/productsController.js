const productsService = require('../services/productsService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const create = await productsService.addProduct(name, quantity);

  if (create.err) return res.status(422).json(create);

  res.status(201).json(create);
};

module.exports = {
  addProduct,
};
