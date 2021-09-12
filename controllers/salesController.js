const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const itensSold = req.body;

  const { id: _id } = await salesService.create({ itensSold });
  
  return res.status(200).json({ _id, itensSold });
};

module.exports = {
  createSale,
};