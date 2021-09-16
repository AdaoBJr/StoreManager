const service = require('../services/SalesServices');

const createSales = async (req, res) => {
  const arr = req.body;
  const addSales = await service.createSales(arr);

  if (addSales.err) {
    return res.status(422).json({ err: addSales.err });
  }
  
  res.status(200).json(addSales);
};

module.exports = {
  createSales,
};