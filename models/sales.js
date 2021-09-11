const connection = require('./connection');

const createSales = async (sales) => {
  const db = await connection();
  const insert = await db.collection('sales').insertMany(sales);
  return insert;
};

module.exports = {
  createSales,
};
