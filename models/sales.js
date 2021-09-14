const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const responseConnection = await connection();
  return responseConnection.collection('sales').find().toArray();
};

const findId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const responseConnection = await connection();
  return responseConnection.collection('sales').findOne(ObjectId(id));
};

const create = async (itensSold) => {
  const responseConnection = await connection();
  const { insertedId } = await responseConnection.collection('sales').insertOne({ itensSold });
  return {
    _id: insertedId,
    itensSold,
  };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const responseConnection = await connection();
  await responseConnection
    .collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return findId(id);
};

module.exports = {
  getAll,
  create,
  findId,
  update,
};
