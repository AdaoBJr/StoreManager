// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const saveSale = async (body) => {
  const { insertedId: id } = await connection().then((db) =>
    db.collection('sales').insertOne({ body }));
  return {
    _id: id,
    itensSold:
       body,
  };
  };

module.exports = {
  saveSale,
};