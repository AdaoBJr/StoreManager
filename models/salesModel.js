const mongodb = require('./connection');

const registerNewSale = async (newSale) => {
  const { insertedId } = await mongodb.getConnection()
  .then((db) => db.collection('sales').insertOne({ itensSold: newSale }));
  return { _id: insertedId, itensSold: newSale };
};

module.exports = {
  registerNewSale,
};