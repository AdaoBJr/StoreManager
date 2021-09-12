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

module.exports = {
  createSale,
};