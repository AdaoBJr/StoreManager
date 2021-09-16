const { saleAdd, getAllsales, getSalesId, updateSale,
  deleteSale } = require('../models/salesModel');

const createS = async (result) => {
  const creatSale = await saleAdd(result);
  return creatSale;
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
  const upSale = await updateSale({ id, productId, quantity });
  return upSale;
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
