const SalesService = require('../services/SalesService');

const createSales = async (req, res) => {
  const arrSales = req.body;

  const salesCreated = await SalesService.create(arrSales);

  if (salesCreated.err) {
    return res.status(422).json({ err: salesCreated.err });
  }

  res.status(200).json(salesCreated);
};

module.exports = {
  createSales,
};