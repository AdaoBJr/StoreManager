const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createSale = async (itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  // console.log({ _id: sale.insertedId, itensSold });
  return { _id: sale.insertedId, itensSold };
};

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  // console.log(saleData);
  if (!saleData) return null;

  return saleData;
};

module.exports = {
  createSale,
  findSaleById,
  getAllSales,
};