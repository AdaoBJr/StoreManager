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

const updateSale = async (id, body) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const updateData = await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { body } }));
    if (!updateData) return null;
    return {
      _id: id,
      itensSold:
         body,
    };
};

module.exports = {
  saveSale,
  getSaleById,
  getAll,
  updateSale,
};