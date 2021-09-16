const { ObjectId } = require('mongodb');
const connection = require('./connection');

const validateProduct = async (productId) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(productId) });
  if (result === null) {
    return false;
  }
  return true;
};

const create = async (sales) => {
  const invalidIds = await sales.every((sale) => validateProduct(sale.productId));
  if (!invalidIds) {
    return null;
  }
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: [...sales] });
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

const update = async ({ body, id }) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  if (result === null) return null;
  const { itensSold } = result;
  // result = await validateProduct(productId);
  // if (!result) return null;
  await db.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { itensSold: [...itensSold, body] } });
  console.log(itensSold);
  return { _id: id, itensSold: body };  
};

const exclude = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};