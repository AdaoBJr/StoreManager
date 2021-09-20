const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;  
};

const getById = async ({ id }) => {
  const db = await connect.connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  if (!sale) {
    return false;
  }
  return sale;
};

const create = async (itensSold) => {
  const db = await connect.connection();
  const sale = await db.collection('sales').insertOne({ itensSold });
  return {
    _id: sale.insertedId,
    itensSold,
  };
};

const update = async (id, sale) => {
  const db = await connect.connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return {
    _id: id,
    itensSold: sale,
  };
};

const deleteSale = async (id) => {
  const db = await connect.connection();
  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};
