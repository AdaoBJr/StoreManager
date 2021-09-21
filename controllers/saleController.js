const saleService = require('../services/saleService');

const ok = 200;
// const created = 201;
const unprocessableEntity = 422;
const notFound = 404;

// req 5
const registerSale = async (req, res) => {
  const sale = req.body;
  const register = await saleService.registerSaleValidation(sale);
  const { _id, code, message } = register;
  if (message) {
    return res.status(unprocessableEntity).json({ err: { code, message } });
  }
  return res.status(ok).json({ _id, itensSold: [...req.body] });
};

// req 6
const findAllSales = async (req, res) => {
  const allSales = await saleService.findAllSalesValidation();
  return res.status(ok).json({ sales: allSales });
};

// req 6
const findSaleById = async (req, res) => {
  const { id } = req.params;
  const saleById = await saleService.findSaleByIdValidation(id);
  const { code, message } = saleById;
  if (message) {
    return res.status(notFound).json({ err: { code, message } });
  }
  return res.status(ok).json(saleById);
};

// req 7
const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedSale = await saleService.updateSaleValidation(id, body);
  const { code, message } = updatedSale;

  if (message) {
    return res.status(unprocessableEntity).json({ err: { code, message } });
  }
  return res.status(ok).json(updatedSale);
};

module.exports = {
  registerSale,
  findAllSales,
  findSaleById,
  updateSale,
};
