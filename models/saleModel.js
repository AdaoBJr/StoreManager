const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (array) => {
  const data = await connection().then((db) => db.collection('sales'));
  const create = await data.insertMany(array);
  return create;
};

const getAll = async () => {
  const data = await connection().then((db) => db.collection('sales'));
  const findAll = await data
  .aggregate([{ $project:
      {
        _id: '$_id', 
        itensSold: { productId: '$productId', quantity: '$quantity' }, 
      }, 
  }]).toArray();
  return findAll;
};

const getById = async (id) => {
  const data = await connection().then((db) => db.collection('sales'));
  const findId = await data.findOne({ _id: ObjectId(id) });
  return findId;
};

module.exports = {
  createSale,
  getAll,
  getById,
};