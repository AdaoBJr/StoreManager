const ServiceSales = require('../service/serviceSales');

const create = async (req, res) => {
  const itensSold = req.body;

  const salesMade = await ServiceSales.create(itensSold);

  if (!salesMade) return res.status(422).json({ message: 'erro' });
  return salesMade;
};

module.exports = { create };
