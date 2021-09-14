const { ObjectID } = require('mongodb');
const { getConnection } = require('./connection');

const create = async (productsArray) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));

  const response = await salesCollection
    .insertOne({ itensSold: productsArray });
  return response.ops[0];
};

const getAll = async () => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));

  const response = await salesCollection
    .find().toArray();
  
  return {
    sales: response,
  };
};

const getById = async (id) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));

  const response = await salesCollection.findOne(new ObjectID(id));
  return response;
};

const update = async (id, sale) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));
  const response = await salesCollection.updateOne(
    { _id: new ObjectID(id) },
    { $set: { itensSold: sale } },
  );
  return response;
};

const deleteById = async (id) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));

  try {
    const deleted = await salesCollection.deleteOne(
      { _id: new ObjectID(id) },
    );
    return deleted;
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  update,
};
