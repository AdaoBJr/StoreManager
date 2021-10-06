const model = require('../models/Products');
const valid = require('../Promisses/productsPromisses');

const selectAll = () => model.selectAll();

const selectById = async (id) => {
  const ret = await model.selectById(id);
  valid.checkProductId(ret);
  return ret;
};

const createProd = async ({ name, quantity }) => {
  valid.checkNameLength(name);
  valid.checkValidQuantity(quantity);
  await valid.findProductByName(name, model.findByName);
  const ret = await model.createProd({ name, quantity });
  return ret;
};

const updateProd = async (id, name, quantity) => {
  valid.checkNameLength(name);
  valid.checkValidQuantity(quantity);
  const ret = await model.updateProd(id, name, quantity);
  valid.checkProductId(ret);
  return ret;
};

const deleteProd = async (id) => {
  const ret = await model.deleteProd(id);
  valid.checkProductId(ret);
  return ret;
};

module.exports = {
  createProd,
  selectAll,
  selectById,
  updateProd,
  deleteProd,
};
