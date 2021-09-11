const model = require('../models/saleModel');

const validateQuantity = (sale) => {
  const mapcheck = sale.map((item) => {
    if (item.quantity <= 0) return false;
    if (typeof item.quantity !== 'number') return false; 
    return true;
  });
  const found = mapcheck.every((e) => e === true);
    return found;
};

const create = async (sale) => {
  const createSale = await model.create(sale);
  return createSale;
};

const getSaleById = async (sale) => {
const getSale = await model.getById(sale);
return getSale;
};

const updateSale = async (id, sale) => {
  const product = await model.update(id, sale);
  return product;
};

module.exports = { create, validateQuantity, getSaleById, updateSale };
