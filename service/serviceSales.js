const ServiceSales = require('../model/modelSales');

const format = (sale) => [{ itensSold: sale }];

const create = async (sales) => {
  const sale = format(sales);
  const salesMade = await ServiceSales.create(sale);

  return salesMade;
};

module.exports = { create };
