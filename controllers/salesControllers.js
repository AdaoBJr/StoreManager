const salesService = require('../services/salesService');

const create = async (req, res) => {
  const itensSold = req.body;

  const id = await salesService.create(itensSold);

  res.status(201).json({ _id: id, itensSold });
};

module.exports = { create };