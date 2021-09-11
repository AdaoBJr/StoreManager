const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sold) => {
  const storeManager = await connection();
  const sales = await storeManager.collection('sales');

  const query = { itensSold: sold };

  const { insertedId: id } = await sales.insertOne(query);

  return {
    id,
  };
};

const getAll = async () => {
  const storeManager = await connection();
  const sales = await storeManager.collection('sales');

  const result = await sales.find().toArray();

  return result;
};

const getById = async ({ id }) => {
  const storeManager = await connection();
  const sales = await storeManager.collection('sales');

  const query = { _id: ObjectId(id) };

  const result = await sales.findOne(query);

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};
