const { add, getOne } = require('../models/saleModel');

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

const createSale = async (productsSold) => {
  if (!quantityCheck(productsSold)) return null;

  return add(productsSold);
};

module.exports = {
  createSale,
  readSale,
};