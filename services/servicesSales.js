const { getId, createSales } = require('../models/salesModel');

const insertSales = async (sales) => {
  const result = await getId(sales);
  if (result) {
    return null;
  } 
  const create = await createSales(sales);
  console.log(create);
  return create;
};

module.exports = { insertSales, getId, createSales };
