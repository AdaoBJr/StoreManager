const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSales = async (itemSold) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold: [...itemSold] }]))
      .then((result) => result.ops[0]);

      return sales;
};

const getAllSales = async () => {
  const listAllSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

    return listAllSales;
};

const getSalesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const salesId = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

    return salesId;
};

const updateSale = async (id, dataSales) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { dataSales } }));

  return { _id: id, itensSold: dataSales };
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const saleId = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

    return saleId;
};

    module.exports = {
      registerSales,
      getAllSales,
      getSalesId,
      updateSale,
      deleteSale,
    };