const model = require('../models/sales');

const saleValidation = (sale) => {
    sale.forEach((i) => {
        if (i.quantity < 1 || typeof i.quantity !== 'number') {
            const e = new Error();
            e.statusCode = 'invalidSale';
            throw e;
        }
    });
};

const validateSale = (sale) => {
  if (!sale) {
    const e = new Error();
    e.statusCode = 'saleNotFound';
    throw e;
  }
};

const allSales = () => model.allSales();

const selectById = async (id) => {
  const result = await model.selectById(id);
  validateSale(result);
  return result;
};

const newSale = async (sale) => {
    saleValidation(sale);
    const ret = await model.newSale(sale);
    return ret;
};

const saleUpdate = async (id, sale) => {
  saleValidation(sale);
  const result = await model.saleUpdate(id, sale);
  return result;
};

module.exports = {
    newSale,
    allSales,
    selectById,
    saleUpdate,
};
