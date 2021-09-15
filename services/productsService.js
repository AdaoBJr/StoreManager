const { createProd, getAllProd, deleteProd, getProdId,
  updateProd } = require('../models/productsModel');
const { getId } = require('../middlewares/productsMiddleware');

const createP = async ({ name, quantity }) => {
  const newProducts = await createProd({ name, quantity });
  return newProducts;
};
const deleteP = async ({ id }) => {
  const product = await getId({ id });
  if (!product) return product;
  const { name, quantity, _id } = product;
  await deleteProd({ id });
  return { name, quantity, _id };
};
const getAllP = async () => {
  const products = await getAllProd();
  return products;
};
const getProId = async (id) => {
  const product = await getProdId(id);
  return product;
};
const updateP = async ({ id, name, quantity }) => {
  const updateProducts = await updateProd({ id, name, quantity });
  return updateProducts;
};

module.exports = {
  createP,
  deleteP,
  getAllP,
  getProId,
  updateP,
};
