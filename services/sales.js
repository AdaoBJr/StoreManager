const modelSales = require('../models/sales');
const {
  isQuantityValid,
  isIdValid,
} = require('../schemas/sales');

const create = async (sales) => {
  const isValid = isQuantityValid(sales);
  if (isValid.err) return isValid;
  const newSale = await modelSales.create(sales);
  return { code: 200, newSale };
};

const getAll = async () => {
  const sales = await modelSales.getAll();
  return { code: 200, sales };
};

const getById = async (id) => {
  const idValid = isIdValid(id);
  if (idValid.err) return idValid;
  console.log('aaaa');
  const sale = await modelSales.getById(id);

  if (!sale) {
    return {
      code: 404,
      err: {
        code: 'not_found', message: 'Sale not found',
      },
    };
  }
  return { code: 200, sale };
};

const update = async (id, updates) => {
  const validationQuantity = isQuantityValid(updates);
  if (validationQuantity.err) return validationQuantity;
  const isValid = isIdValid(id);
  if (isValid.err) return isValid;
  const updatedSale = await modelSales.update(id, updates);
  return { code: 200, updatedSale };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
