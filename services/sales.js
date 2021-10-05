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

const checkDelete = (sale) => {
  if (!sale) {
    const e = new Error();
    e.statusCode = 'unprocessable';
    throw e;
  }
};

const updateStock = async (sale) => {
  const sales = sale.map((item) =>
    model.sellQuantity(item.productId, item.quantity));
  Promise.all(sales);
};

const allSales = () => model.allSales();

const selectById = async (id) => {
  const result = await model.selectById(id);
  validateSale(result);
  return result;
};

const newSale = async (sale) => {
    saleValidation(sale);
    await updateStock(sale);
    const ret = await model.newSale(sale);
    return ret;
};

const saleUpdate = async (id, sale) => {
  saleValidation(sale);
  const result = await model.saleUpdate(id, sale);
  return result;
};

const saleDelete = async (id) => {
  const sale = await model.selectById(id);
  checkDelete(sale);
  const { itensSold } = sale;
  const item = [{ productId: itensSold[0].productId, quantity: itensSold[0].quantity * -1 }];
  if (itensSold) await updateStock(item);
  const result = await model.saleDelete(id);
  return result;
};

module.exports = {
    newSale,
    allSales,
    selectById,
    saleUpdate,
    saleDelete,
};
