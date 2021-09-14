const connection = require('./connection');

const addSale = async (sale) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('products').insertOne({ itensSold: sale }));

  return { _id: insertedId, itensSold: sale };
};

module.exports = {
  addSale,

};