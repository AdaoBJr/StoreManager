  const {
    createNewSale,
    listAll,
    saleById,
    updateSale,
    deleteSale,
  } = require('../models/sales.model');

  const createSale = async (sale) => {
    const newSale = await createNewSale(sale);
    return newSale;
  };

  const getAllSales = async () => {
    const sales = await listAll();
    return sales;
  };

  const getSaleById = async (id) => {
    const sales = await saleById(id);
    return sales;
  };

  const updateSales = async (id, itemsToUpdate) => {
    const sales = await updateSale(id, itemsToUpdate);
    return sales;
  };

  const removeSale = async (id) => {
    const removedSale = await deleteSale(id);
    return removedSale;
  };

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSales,
  removeSale,
};