const service = require('../services/salesService');

const insertNewSale = async (req, res) => {
  const itensSold = req.body;
  const result = await service.insertNewSale(itensSold);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  } 
  res.status(200).json(result);
};

module.exports = {
  insertNewSale,
};