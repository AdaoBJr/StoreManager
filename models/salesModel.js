const { ObjectId } = require('mongodb');
const connection = require('./connection');

const validateProduct = async ({ productId }) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(productId) });
  console.log(result);
  if (result === null) {
    return false;
  }
  return true;
};

const create = async (sales) => {
  const invalidIds = await sales.every(validateProduct);
  console.log(invalidIds);
  if (!invalidIds) {
    return null;
  }
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: [...sales] });
  console.log('peido');
  return {
    _id: result.insertedId,
    itensSold: [...sales],
  };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

module.exports = {
  create,
  getAll,
  getById,
};