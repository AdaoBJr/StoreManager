const ServiceSales = require('../service/serviceSales');

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await ServiceSales.getById(id);

  if (sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await ServiceSales.getAll();
  return res.status(200).json(sales);
};

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

module.exports = { create, getAll, getById };
