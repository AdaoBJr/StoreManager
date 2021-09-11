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

const shouldAllowUpate = async (sales) => {
  const quantityStatus = await sales.map(async (sale) => {
    const currentQuantity = await ProductsModels.getById(sale.productId);
    const remainingQuantity = currentQuantity.quantity - sale.quantity;
    return remainingQuantity;
  });
  const arrayResolvedPromises = await Promise.all(quantityStatus).then((result) => result);
  return arrayResolvedPromises.every((number) => number < 0);
};

const createSales = async (sales) => {
  const shouldNotUpdate = await shouldAllowUpate(sales);
  if (shouldNotUpdate) {
    return { tooMuch: true };
  } 
  const formatedSales = formatSales(sales);
  const insertedId = await SalesModels.createSales(formatedSales);
  await sales.forEach(async (sale) => decreaseProductQuantity(sale.productId, sale.quantity));
  return { _id: insertedId.insertedIds['0'], itensSold: sales }; 
};

const editSale = async (id, newSales) => {
  const editedSale = await SalesModels.editSale(id, newSales)
  .then(() => getById(id));
  return editedSale;
};

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
