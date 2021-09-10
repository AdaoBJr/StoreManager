const ProductsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id: _id } = await ProductsService
    .create({ name, quantity });
  
  return res.status(201).json({
    _id,
    name,
    quantity,
  });
};

module.exports = {
  create,
};