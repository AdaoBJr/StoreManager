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

const update = async ({ id, saleArray: { productId, quantity } }) => {
  const db = await mongoConnection.getConnection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [productId, quantity] } });
  return {
    _id: id,
    itensSold: [{ productId, quantity }],
  };
};

const deleteById = async (id) => {
  const db = await mongoConnection.getConnection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteById,
};
