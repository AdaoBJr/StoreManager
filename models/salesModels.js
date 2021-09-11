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

const updateById = async ({ id, itensSold }) => {
  const storeManager = await connection();
  const sales = await storeManager.collection('sales');

  const filterQuery = { _id: ObjectId(id) };
  const updateQuery = { $set: { itensSold } };

  await sales.findOneAndUpdate(filterQuery, updateQuery);

  return {
    _id: id,
    itensSold,
  };
};

const deleteById = async ({ id }) => {
  const storeManager = await connection();
  const sales = await storeManager.collection('sales');

  const query = { _id: new ObjectId(id) };

  const result = await sales.findOneAndDelete(query);

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
