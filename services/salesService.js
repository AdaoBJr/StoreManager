const salesModel = require('../models/salesModel');

const verifyQuantities = (sales) => { 
  const filtered = sales.filter((sale) => sale.quantity <= 0);
  
  return filtered;
};

const verifyQuantitiesString = (sales) => {
  const filtered = sales.filter((sale) => typeof (sale.quantity) !== 'number');
  return filtered;
};

const createSales = async (newSales) => {
  const addNewSale = await salesModel.createSale(newSales);
  return addNewSale;
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

const editSale = async (id, sale) => {
  const editedSale = await salesModel.editSale(id, sale);
  return editedSale;
};

const deleteSale = async (id) => {
  console.log('cheguei no service com id', id);
  const deletedProduct = await salesModel.deleteSale(id);
  console.log('o retorno para o service foi', deletedProduct);
  return deletedProduct;
};

module.exports = {
  verifyQuantities,
  verifyQuantitiesString,
  createSales,
  getAll,
  getById,
  editSale,
  deleteSale,
};