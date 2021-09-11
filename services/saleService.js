const model = require('../models/saleModel');

const saless = [
  {
      productId: 'd3d32d32d',
      quantity: '400',
  },
  {
    productId: 'd3d32d32d',
    quantity: '400',
},
];

const validateQuantity = (sale) => {
  const mapcheck = sale.map((item) => {
    if (item.quantity <= 0) return false;
    if (typeof item.quantity !== 'number') return false; 
    return true;
  });
  const found = mapcheck.every((e) => e === true);
    return found;
};
console.log(validateQuantity(saless));

const create = async (sale) => {
  const createSale = await model.create(sale);
  return createSale;
};

module.exports = { create, validateQuantity };
