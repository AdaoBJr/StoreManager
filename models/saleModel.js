const connection = require('./connection');

const createSale = async (array) => {
  const data = await connection().then((db) => db.collection('sales'));
  const create = await data.insertMany(array);
  return create;
};

module.exports = {
  createSale,
};