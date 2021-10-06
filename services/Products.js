const model = require('../models/Products');

const checkNameLength = (name) => {
  if (name.length < 5) {
    const error = new Error();
    error.statusCode = 'invalidName';
    throw error;
  }
};

const checkValidQuantity = (quantity) => {
  if (quantity < 1) {
    const error = new Error();
    error.statusCode = 'invalidQuantity';
    throw error;
  }

  if (typeof quantity !== 'number') {
    const error = new Error();
    error.statusCode = 'invalidQuantityType';
    throw error;
  }
};

const checkProductId = (productId) => {
  if (!productId) {
    const error = new Error();
    error.statusCode = 'invalidIdFormat';
    throw error;
  }
};

const findProductByName = async (name) => {
  const product = await model.findByName(name);
  if (product) {
    const error = new Error();
    error.statusCode = 'alreadyExists';
    throw error;
  }
};

const selectAll = () => model.selectAll();

const selectById = async (id) => {
  const result = await model.selectById(id);
  checkProductId(result);
  return result;
};

const createProd = async ({ name, quantity }) => {
  checkNameLength(name);
  checkValidQuantity(quantity);
  await findProductByName(name);
  const result = await model.createProd({ name, quantity });
  console.log(result);
  return result;
};

const updateProd = async (id, name, quantity) => {
  checkNameLength(name);
  checkValidQuantity(quantity);
  const result = await model.updateProd(id, name, quantity);
  checkProductId(result);
  return result;
};

const deleteProd = async (id) => {
  const result = await model.deleteProd(id);
  checkProductId(result);
  console.log(result);
  return result;
};

module.exports = {
  createProd,
  selectAll,
  selectById,
  updateProd,
  deleteProd,
};
