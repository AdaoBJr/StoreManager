const salesService = require('../services/saleService');

const createSale = async (req, res) => {
  try {
    const sales = req.body;
    const create = await salesService.createSale(sales);
    return res.status(200).json(create);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSale,
};