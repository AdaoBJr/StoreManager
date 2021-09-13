const salesSchema = require('../schemas/salesSchema');

const checkSale = (itensSold, method) => {
  const validations = [];
  const i = 0;
  for (let index = i; index < itensSold.length; index += 1) {
    if (method) {
      validations.push(salesSchema.checkProductInventory(itensSold[index], method));
    } else {
      validations.push(salesSchema.validateSale(itensSold[index]));
    }
  }
  return validations;
};

const validateSaleData = async (req, res, next) => {
  const itensSold = req.body;
  const saleValidations = checkSale(itensSold);
  const quantityValidations = checkSale(itensSold, req.method);
  let foundIssue = {};

  await Promise.all(saleValidations).then((results) => {
    results.forEach((saleValidate) => {
      foundIssue = saleValidate || {};
    });
  });
  if (foundIssue.response) return res.status(foundIssue.response).json({ err: foundIssue.err });
  await Promise.all(quantityValidations).then((results) => {
    results.forEach((qtValidate) => {
      foundIssue = qtValidate || {};
    });
  });
  if (foundIssue.response) return res.status(foundIssue.response).json({ err: foundIssue.err });
  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  const validation = await salesSchema.idIsNotValid(id);
  if (validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

const validateSaleExists = async (req, res, next) => {
  const { id } = req.params;
  const { method } = req;
  const validation = await salesSchema.saleExists(id, method);
  if (validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

module.exports = { validateSaleData, validateSaleId, validateSaleExists };
