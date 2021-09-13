const connection = require('../connection');

const getName = async (name) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('Products').findOne({ name });
  return result;
};

const insertOne = async (name, quantity) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('Products')
  .insertOne({ name, quantity });
  return result;
};

const getAll = async () => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('Products').find().toArray();
  return result;
};

module.exports = { getName, insertOne, getAll };
