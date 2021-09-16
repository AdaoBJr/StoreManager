const { saleAdd, getAllsales, getSalesId, updateSale, deleteSale } = require('../models/salesModel');

const createS = async (result) => {
  const createS = await saleAdd(result);
  return createS;
};
const getAllS = async () => {
  const allSales = await getAllsales();
  return allSales;
};
const getIdS = async (id) => {
  const idSales = await getSalesId(id);
  return idSales;
};
const updateS = async ({ id, productId, quantity }) => {
  const updateS = await updateSale({ id, productId, quantity });
  return updateS;
};
const deleteS = async ({ id }) => {
  const deletedS = await deleteSale({ id });
  return deletedS;
};

module.exports = { 
  createS, 
  getAllS, 
  getIdS, 
  updateS, 
  deleteS,
};
