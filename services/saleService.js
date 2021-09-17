const { add, getOne, update } = require('../models/saleModel');

const isNumber = (value) => !Number.isNaN(Number(value));

const quantityCheck = (productsSold) => {
  let testPass = true;
  productsSold.map((product) => {
    if (product.quantity <= 0) testPass = false;
    if (!isNumber(product.quantity)) testPass = false;
    return testPass;
  });
  return testPass;
};

const readSale = async (id) => {
  const sale = await getOne(id);
  if (!sale) return null;

  return sale;
};

const createSale = (productsSold) => {
  if (!quantityCheck(productsSold)) return null;

  return add(productsSold);
};

const updateService = async (id, productId, quantity) => {
  if (quantity <= 0) return null;
  if (!isNumber(quantity)) return null;
  const updated = await update(id, productId, quantity);
  return updated;
};

module.exports = {
  createSale,
  readSale,
  updateService,
};