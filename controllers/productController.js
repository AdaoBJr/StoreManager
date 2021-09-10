const service = require('../services/productsService');

const insertNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await service.insertNewProduct(name, quantity);
  const { err } = result;
  if (result.err) return res.status(result.status).json({ err });
  const productInserted = result.json;
  res.status(result.status).json(productInserted);
};

module.exports = {
  insertNewProduct,
};
