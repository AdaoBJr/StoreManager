const salesValidations = require('../services/salesValidations');

const createSale = async (req, res) => {
  const { body } = req;
  const create = await salesValidations.validateCreateSale(body);
  const { _id, code, message } = create;
  res.status(200).json({ _id, itensSold: [...req.body] });
};

module.exports = {
  createSale,
};
