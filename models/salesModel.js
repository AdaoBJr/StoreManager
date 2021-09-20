const connection = require('./connection');

const createSale = async (sales) => 
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));

module.exports = {
  createSale,
};