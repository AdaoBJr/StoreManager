const SalesModels = require('../models/sales');
const ProductsModels = require('../models/products');

const formatSales = (sales) => [{ itensSold: sales }];

const getById = async (id) => {
  const sale = await SalesModels.getById(id);
  return sale;
};

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

const increaseProductQuantity = async (id, quantity) => {
  await ProductsModels.increaseProductQuantity(id, quantity);
};

const decreaseProductQuantity = async (id, quantity) => {
  await ProductsModels.decreaseProductQuantity(id, quantity);
};

// decrease
const createSales = async (sales) => {
  const formatedSales = formatSales(sales);
  const insertedId = await SalesModels.createSales(formatedSales);
  await sales.forEach(async (sale) => decreaseProductQuantity(sale.productId, sale.quantity));
  return { _id: insertedId.insertedIds['0'], itensSold: sales };
};

// increase ou decrease
const editSale = async (id, newSales) => {
  console.log(newSales)
  const editedSale = await SalesModels.editSale(id, newSales)
  .then(() => getById(id));
  return editedSale;
};

// increase
const deleteSale = async (id) => {
  const deletedSale = await getById(id);
  await SalesModels.deleteSale(id);
  await deletedSale.itensSold
  .forEach(async (sale) => increaseProductQuantity(sale.productId, sale.quantity));
  return deletedSale;
};

module.exports = {
  createSales,
  getById,
  getAllSales,
  editSale,
  deleteSale,
};
