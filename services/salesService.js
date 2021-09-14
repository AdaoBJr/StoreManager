const SalesModel = require('../models/sales');

const getAll = async () => {
  const productsAll = SalesModel.getAll();
  return productsAll;
};

const create = async (sales) => {
  const newSale = await SalesModel.create(sales);
  return newSale;
};

const findId = async (id) => {
  const sales = await SalesModel.findId(id);
  return sales;
};

const update = async (id, itensSold) => SalesModel.update(id, itensSold);

const deleteSales = async (id) => {
  const product = await SalesModel.deleteSales(id);
  return product;
};

module.exports = {
  create,
  getAll,
  findId,
  update,
  deleteSales,
};
