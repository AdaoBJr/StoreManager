const Sale = require('../models/sales.models');
const Validation = require('../schemas/sales.schemas');

const create = async (sales) => {
  const isValid = Validation.isQuantityValid(sales);
  if (isValid.err) return isValid;
  const newSale = await Sale.create(sales);
  return { code: 200, newSale };
};

const getAll = async () => {
  const sales = await Sale.getAll();
  return { code: 200, sales };
};

const getSaleById = async (id) => {
  const idValid = Validation.isIdValid(id);
  if (idValid.err) return idValid;
  console.log('aaaa');
  const sale = await Sale.getSaleById(id);

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

module.exports = { create, getAll, getSaleById };
