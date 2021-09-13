const service = require('../services/saleService');
const messages = require('../helpers/validationMessages');

const createSale = async (req, res) => {
  try {
    const sale = req.body;
    const [{ quantity }] = sale;
    const result = await service.createSale(sale);

    if (service.numberOfQuantity(quantity) === false) {
      res.status(422).json(messages.saleNumberQuantity);
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(messages.error);
  }
};

const getSales = async (_req, res) => {
  try {
    const getSale = await service.getAllSales();
    
    return res.status(200).json(getSale);
  } catch (error) {
    return res.status(500).json(messages.error);
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await service.getById(id);

    if (sales === null) return res.status(404).json(messages.saleNotFound);

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json(messages.saleNotFound);
  }
};

module.exports = {
  createSale,
  getSales,
  getSalesById,
};