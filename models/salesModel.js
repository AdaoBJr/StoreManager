 const { ObjectId } = require('mongodb');
const connection = require('./connection');

const saveSale = async (body) => {
  const { insertedId: id } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: body }));
  return {
    _id: id,
    itensSold:
       body,
  };
  };

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  console.log(id);
  const findSale = await connection().then((db) =>
  db.collection('sales').findOne(new ObjectId(id)));
  console.log(findSale);
  if (!findSale) return null;
  return findSale;
};

const getAll = async () => {
 const allSales = await connection().then((db) =>
 db.collection('sales').find().toArray());
 return allSales;
};

module.exports = {
  saveSale,
  getSaleById,
  getAll,
};