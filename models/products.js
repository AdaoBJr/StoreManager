const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

module.exports = {
  getAll,
};
