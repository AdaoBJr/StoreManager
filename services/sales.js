const SalesModels = require('../models/sales');

const createSales = async (sales) => {
  const insertedId = await SalesModels.createSales(sales);
  return { _id: insertedId.insertedIds['0'], itensSold: sales };
};

module.exports = {
  createSales,
};
