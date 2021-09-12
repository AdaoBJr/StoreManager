const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray())
  .then((result) => result);

  const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
  
    const getSalesId = await connection()
      .then((db) => db.collection('sales').findOne(new ObjectId(id)));  
  
    if (!getSalesId) return null;
  
    return getSalesId;
  };

const create = async (arr) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: arr }))
  .then((result) => result.ops[0]);

module.exports = {
  getAll,
  findById,
  create,
};