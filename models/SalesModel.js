const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async (body) => {
  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('sales')
    .insertOne({ itensSold: [...body] });

  return { _id: id, itensSold: [...body] };
};

const findById = async (id) => {
  const db = await mongoConnection.getConnection();
  const getById = await db.collection('sales').findOne(ObjectId(id));
  
  return getById;
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const allSales = await db.collection('sales').find().toArray();
  return { sales: allSales };
};

module.exports = {
  create,
  getAll,
  findById,
};
