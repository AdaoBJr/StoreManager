const SalesModels = require('../models/sales');

const formatSales = (sales) => [{ itensSold: sales }];

const createSales = async (sales) => {
  const formatedSales = formatSales(sales);
  const insertedId = await SalesModels.createSales(formatedSales);
  return { _id: insertedId.insertedIds['0'], itensSold: sales };
};

const getById = async (id) => {
  const sale = await SalesModels.getById(id);
  return sale;
};

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

const editSale = async (id, newSales) => {
  const editedSale = await SalesModels.editSale(id, newSales).then(() => getById(id));
  return editedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await getById(id)
    .then(() => SalesModels.deleteSale(id));
  return deletedSale;
};

module.exports = {
  createSales,
  getById,
  getAllSales,
  editSale,
  deleteSale,
};
