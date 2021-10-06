const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales')
    .find().toArray();
  if (sales.length === 0) return null;
  return { sales };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!saleData) return null;

  return saleData;
};

const create = async (productArray) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .insertOne({ itensSold: productArray });
    return { _id: sale.insertedId, itensSold: productArray };
};

const productsExist = async (productArray) => {
  const db = await connection();
  await db.collection('products')
    .find({ _id: { $in: productArray } }).toArray();
};

const update = async (_id, productArray) => {
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { itensSold: productArray } });

      return { _id, itensSold: productArray }; 
};

const deleteOne = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getById,
  create,
  productsExist,
  update,
  deleteOne,
};
