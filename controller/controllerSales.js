const ServiceSales = require('../service/serviceSales');

const create = async (req, res) => {
  const itensSold = req.body;
  const salesMade = await ServiceSales.create(itensSold);
  
  if (salesMade.err) return res.status(422).json(salesMade);
  if (salesMade.outStock) {
    return res.status(422).json({ 
      err: { 
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    }); 
  }

  return res.status(200).json(salesMade);
};

module.exports = { create };
